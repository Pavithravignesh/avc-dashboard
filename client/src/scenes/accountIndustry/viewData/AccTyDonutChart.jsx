import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useTheme } from "@mui/material/styles";

const COLORS = d3.schemeCategory10;
const formatK = val => `$${(val / 1000).toLocaleString()}K`;

function AccTyDonutChart({ data, width = 300, height = 300 }) {
    const ref = useRef();
    const theme = useTheme();

    useEffect(() => {
        if (!data || data.length === 0) return;

        const radius = Math.min(width, height) / 2;
        const padding = 60;

        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();

        svg
            .attr("width", width)
            .attr("height", height)
            .attr(
                "viewBox",
                `-${width / 2 + padding} -${height / 2 + padding} ${width + padding * 2} ${height + padding * 2}`
            );

        const g = svg.append("g").attr("transform", "translate(0,0)");

        const pie = d3.pie().value(d => d.value).sort(null);

        const arc = d3.arc()
            .innerRadius(radius * 0.65)
            .outerRadius(radius - 10);

        const arcs = g
            .selectAll("g")
            .data(pie(data))
            .enter()
            .append("g");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", (_, i) => COLORS[i % COLORS.length])
            .attr("stroke", theme.palette.background.paper) 
            .attr("stroke-width", 2);

        const total = d3.sum(data, d => d.value);

        // /* ───────── LABEL ARC & CONNECTOR LINES ───────── */
        // const labelArc = d3.arc()
        //     .outerRadius(radius * 1.25)   // where connector bends
        //     .innerRadius(radius * 1.25);  // keep inner = outer → circle

        // /* one extra step so the text sits a bit farther to the side */
        // const labelOffset = 18;          

        // /* draw a connector polyline + label for each slice  */
        // arcs.each(function (d) {
        //     const group = d3.select(this);
        //     const midAngle = (d.startAngle + d.endAngle) / 2;
        //     const [x, y] = labelArc.centroid(d);            // bend point

        //     /* 3‑segment polyline:     slice → bend → labelAnchor */
        //     const posA = arc.centroid(d);                      // slice centre
        //     const posB = [x, y];                               // first bend
        //     const posC = [
        //         x + (midAngle > Math.PI ? -labelOffset : labelOffset),
        //         y
        //     ];                                                 // horizontal

        //     /* polyline */
        //     group.append("polyline")
        //         .attr("points", [posA, posB, posC])
        //         .style("fill", "none")
        //         .style("stroke", theme.palette.text.secondary)
        //         .style("stroke-width", 1);

        //     /* label  */
        //     group.append("text")
        //         .attr("x", posC[0] + (midAngle > Math.PI ? -4 : 4))  // a tiny gap
        //         .attr("y", posC[1])
        //         .attr("text-anchor", midAngle > Math.PI ? "end" : "start")
        //         .attr("dominant-baseline", "middle")
        //         .style("font-size", "10px")
        //         .style("font-weight", 500)
        //         .style("fill", theme.palette.text.primary)
        //         .text(
        //             `${formatK(d.data.value)} (${Math.round((d.data.value / total) * 100)}%)`
        //         );
        // });

             g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "-0.4em")
            .style("font-size", "20px")
            .style("font-weight", "600")
            .style("fill", theme.palette.text.primary)
            .text("Total");

        g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "1.4em")
            .style("font-size", "20px")
            .style("font-weight", "600")
            .style("fill", theme.palette.text.primary)
            .text(formatK(total));
    }, [data, width, height, theme]);

    return <svg ref={ref} />;
}

export default AccTyDonutChart;
