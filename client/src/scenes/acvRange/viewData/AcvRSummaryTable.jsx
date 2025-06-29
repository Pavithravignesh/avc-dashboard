import React from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper
} from "@mui/material";
import { useTheme, alpha, lighten, darken } from "@mui/material/styles";
import * as d3 from "d3";

const formatK = val => `$${val.toLocaleString()}`;

function AcvRSummaryTable({ data = [] }) {
    const theme = useTheme();                                   // ← NEW
    /*─────────────────────────────  COLOR TOKENS ─────────────────────────────*/
    const headerBg = theme.palette.primary.main;
    const headerColor = theme.palette.primary.contrastText;
    const subHeaderBg =
        theme.palette.mode === "light"
            ? alpha(theme.palette.primary.light, 0.20)
            : alpha(theme.palette.primary.dark, 0.35);

    // very subtle zebra striping that works in both modes
    const zebra = idx =>
        alpha(theme.palette.action.selected, theme.palette.mode === "light" ? 0.25 : 0.15);

    // total‑row background
    const totalBg =
        theme.palette.mode === "light"
            ? lighten(theme.palette.background.paper, 0.04)
            : darken(theme.palette.background.paper, 0.10);

    /*────────────────────────  DATA SHAPING (unchanged) ──────────────────────*/
    const quarters = [...new Set(data.map(d => d.closed_fiscal_quarter))];
    const custTypes = [...new Set(data.map(d => d.ACV_Range))];
    const summary = {};
    quarters.forEach(q => {
        summary[q] = {};
        custTypes.forEach(type => {
            const rows = data.filter(d => d.closed_fiscal_quarter === q && d.ACV_Range === type);
            summary[q][type] = {
                count: d3.sum(rows, d => d.count ?? 0) || rows.length,
                acv: d3.sum(rows, d => d.acv ?? 0)
            };
        });
        summary[q].total = {
            count: d3.sum(custTypes, type => summary[q][type].count),
            acv: d3.sum(custTypes, type => summary[q][type].acv)
        };
    });
    const grandTotal = {
        count: d3.sum(quarters, q => summary[q].total.count),
        acv: d3.sum(quarters, q => summary[q].total.acv)
    };
    const typeTotals = {};
    custTypes.forEach(type => {
        typeTotals[type] = {
            count: d3.sum(quarters, q => summary[q][type].count),
            acv: d3.sum(quarters, q => summary[q][type].acv)
        };
    });

    /*──────────────────────────────  RENDER  ────────────────────────────────*/
    return (
        <TableContainer
            component={Paper}
            sx={{ mt: 4, borderRadius: 2, boxShadow: 3 }}
        >
            <Table size="small" stickyHeader>
                {/* ───────────────────────── Header Rows ────────────────────────── */}
                <TableHead>
                    <TableRow>
                        <TableCell
                            rowSpan={2}
                            sx={{ backgroundColor: headerBg, color: headerColor, fontWeight: "bold", textAlign: "center" }}
                        >
                            Cust&nbsp;Type
                        </TableCell>
                        {quarters.map(q => (
                            <TableCell
                                key={q}
                                align="center"
                                colSpan={3}
                                sx={{ backgroundColor: headerBg, color: headerColor, fontWeight: "bold" }}
                            >
                                {q}
                            </TableCell>
                        ))}
                        <TableCell
                            align="center"
                            colSpan={3}
                            sx={{ backgroundColor: headerBg, color: headerColor, fontWeight: "bold" }}
                        >
                            Total
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        {[...quarters, "Total"].map(key => (
                            <React.Fragment key={key}>
                                <TableCell align="right" sx={{ backgroundColor: subHeaderBg, fontWeight: "bold" }}>
                                    # of Opps
                                </TableCell>
                                <TableCell align="right" sx={{ backgroundColor: subHeaderBg, fontWeight: "bold" }}>
                                    ACV
                                </TableCell>
                                <TableCell align="right" sx={{ backgroundColor: subHeaderBg, fontWeight: "bold" }}>
                                    % of Total
                                </TableCell>
                            </React.Fragment>
                        ))}
                    </TableRow>
                </TableHead>

                {/* ───────────────────────── Body Rows ───────────────────────────── */}
                <TableBody>
                    {custTypes.map((type, idx) => (
                        <TableRow
                            key={type}
                            sx={{
                                backgroundColor: zebra(idx),
                                transition: "background-color .2s",
                                "&:hover": { backgroundColor: theme.palette.action.hover }
                            }}
                        >
                            <TableCell sx={{ fontWeight: "bold" }}>{type}</TableCell>
                            {quarters.map(q => {
                                const { count, acv } = summary[q][type];
                                const pct = summary[q].total.acv
                                    ? `${Math.round((acv / summary[q].total.acv) * 100)}%`
                                    : "0%";
                                return (
                                    <React.Fragment key={q}>
                                        <TableCell align="right">{count}</TableCell>
                                        <TableCell align="right">{formatK(acv)}</TableCell>
                                        <TableCell align="right">{pct}</TableCell>
                                    </React.Fragment>
                                );
                            })}
                            <TableCell align="right">{typeTotals[type].count}</TableCell>
                            <TableCell align="right">{formatK(typeTotals[type].acv)}</TableCell>
                            <TableCell align="right">
                                {grandTotal.acv
                                    ? `${Math.round((typeTotals[type].acv / grandTotal.acv) * 100)}%`
                                    : "0%"}
                            </TableCell>
                        </TableRow>
                    ))}

                    {/* ────────────────────────── Total Row ────────────────────────── */}
                    <TableRow sx={{ backgroundColor: totalBg }}>
                        <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                        {quarters.map(q => (
                            <React.Fragment key={q}>
                                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                    {summary[q].total.count}
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                    {formatK(summary[q].total.acv)}
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                    100%
                                </TableCell>
                            </React.Fragment>
                        ))}
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>{grandTotal.count}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>{formatK(grandTotal.acv)}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>100%</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AcvRSummaryTable;
