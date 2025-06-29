import React, { useRef } from 'react';
import { useGetAcvRangeQuery } from 'state/api';
import {
    Box,
    useMediaQuery,
    Typography,
    IconButton,
    Tooltip
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Header from "components/Header";
import AcvRSummaryTable from './viewData/AcvRSummaryTable.jsx';
import AcvRDonutChart from './viewData/AcvRDonutChart.jsx';
import AcvRStackedBarChart from './viewData/AcvRStackedBarChart.jsx';
import * as d3 from "d3";
import FlexBetween from 'components/FlexBetween.jsx';
import ShimmerUI from 'components/ShimmerUI.jsx';

function AcvRange() {
    const { data, isLoading } = useGetAcvRangeQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const isTablet = useMediaQuery("(min-width: 768px)");
    const tableRef = useRef();  

    if (isLoading || !data || !Array.isArray(data)) {
        return (
            <Box mt="20px">
                <ShimmerUI />
            </Box>
        );
    }

    const donutData = d3.rollups(
        data,
        v => d3.sum(v, d => d.acv),
        d => d.ACV_Range
    ).map(([label, value]) => ({ label, value }));

    const getChartDimensions = () => {
        if (isNonMobile) {
            return {
                stackedBar: { width: 600, height: 350 },
                donut: { width: 520, height: 320 }
            };
        } else if (isTablet) {
            return {
                stackedBar: { width: 500, height: 300 },
                donut: { width: 480, height: 280 }
            };
        } else {
            return {
                stackedBar: { width: 350, height: 250 },
                donut: { width: 450, height: 250 }
            };
        }
    };

    const dimensions = getChartDimensions();

    // Copy handler
    const handleCopyTable = () => {
        if (!tableRef.current) return;

        const tableText = tableRef.current.innerText;
        navigator.clipboard.writeText(tableText)
            .then(() => {
                alert("Summary table copied to clipboard!");
            })
            .catch(err => {
                console.error("Copy failed", err);
                alert("Failed to copy table.");
            });
    };

    return (
        <Box m={isNonMobile ? "1.5rem 2.5rem" : "1rem 1.5rem"}>
            <Header title="Customer Type" subTitle="Customer type analysis" />

            <Box display="flex" flexDirection="column" gap={3} mt={3}>

                 <Box display="flex" flexDirection={isNonMobile ? "row" : "column"} gap={3}>
                    <Box flex={isNonMobile ? "2" : "1"} display="flex" flexDirection="column" gap={3}>
                        <FlexBetween>
                            <Box display="flex" alignItems="left" justifyContent="center">
                                <AcvRStackedBarChart
                                    data={data}
                                    width={dimensions.stackedBar.width}
                                    height={dimensions.stackedBar.height}
                                />
                            </Box>
                        </FlexBetween>
                    </Box>

                    <Box
                        flex={isNonMobile ? "1" : "1"}
                        minWidth={isNonMobile ? "300px" : "100%"}
                        display="flex"
                        justifyContent="center"
                    >
                        <AcvRDonutChart
                            data={donutData}
                            width={dimensions.donut.width}
                            height={dimensions.donut.height}
                        />
                    </Box>
                </Box>

                 <Box width="100%" ref={tableRef} mb="2rem">
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6">Summary Table</Typography>
                        <Tooltip title="Copy Table">
                            <IconButton onClick={handleCopyTable}>
                                <ContentCopyIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <AcvRSummaryTable data={data} />
                </Box>
            </Box>
        </Box>
    );
}

export default AcvRange;