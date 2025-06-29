import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useTheme } from "@mui/material/styles";

const COLORS = {
  "Existing Customer": "#1f77b4",
  "New Customer": "#ff7f0e",
};

function AccTyStackedBarChart({ data, width = 600, height = 400 }) {
  const ref = useRef();
  const theme = useTheme();

  useEffect(() => {
    if (!data?.length) return;

    const quarters = [...new Set(data.map((d) => d.closed_fiscal_quarter))];
    const types = [...new Set(data.map((d) => d.Acct_Industry))];

    const dataByQuarter = quarters.map((q) => {
      const entry = { quarter: q };
      let total = 0;
      types.forEach((type) => {
        const val =
          data.find(
            (d) => d.closed_fiscal_quarter === q && d.Acct_Industry === type
          )?.acv || 0;
        entry[type] = val;
        total += val;
      });
      entry.total = total;
      return entry;
    });

    const dynamicHeight = height + types.length * 12;
    const margin = { top: 50, right: 20, bottom: 60, left: 80 };
    const svgW = width;
    const svgH = dynamicHeight;
    const w = svgW - margin.left - margin.right;
    const h = svgH - margin.top - margin.bottom;

    d3.select(ref.current).selectAll("*").remove();

    const svg = d3.select(ref.current).attr("width", svgW).attr("height", svgH);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const stack = d3.stack().keys(types);
    const series = stack(dataByQuarter);

    const x = d3.scaleBand().domain(quarters).range([0, w]).padding(0.3);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(dataByQuarter, (d) => d.total) * 1.2])
      .nice()
      .range([h, 0]);

    const xAxisG = g
      .append("g")
      .attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x));

    xAxisG
      .selectAll("text")
      .style("font-size", "12px")
      .style("font-weight", 500)
      .style("fill", theme.palette.text.primary);

    xAxisG.selectAll("path,line").attr("stroke", theme.palette.text.secondary);

    const yAxisG = g
      .append("g")
      .call(d3.axisLeft(y).tickFormat((d) => `$${(d / 1000).toFixed(0)}K`));

    yAxisG
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", theme.palette.text.primary);

    yAxisG.selectAll("path,line").attr("stroke", theme.palette.text.secondary);

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 15)
      .attr("x", -h / 2)
      .attr("text-anchor", "middle")
      .style("font-size", 12)
      .style("fill", theme.palette.text.secondary)
      .text("Revenue");

    g.append("text")
      .attr("x", w / 2)
      .attr("y", h + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .style("font-size", 12)
      .style("fill", theme.palette.text.secondary)
      .text("Closed Fiscal Quarter");

    const layerG = g
      .selectAll(".layer")
      .data(series)
      .join("g")
      .attr("class", "layer")
      .attr(
        "fill",
        (d) => COLORS[d.key] || d3.schemeCategory10[types.indexOf(d.key) % 10]
      );

    layerG
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => x(d.data.quarter))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => Math.max(y(d[0]) - y(d[1]), 5))
      .attr("width", x.bandwidth())
      .attr("stroke", theme.palette.background.paper)
      .attr("stroke-width", 1);

    // layerG.selectAll("text.segment-label")
    //     .data(d => d.filter(seg => seg[1] - seg[0] > 0))
    //     .join("text")
    //     .attr("x", d => x(d.data.quarter) + x.bandwidth() / 2)
    //     .attr("y", d => (y(d[0]) + y(d[1])) / 2 - 4)
    //     .attr("text-anchor", "middle")
    //     .attr("dominant-baseline", "middle")
    //     .style("fill", "#fff")
    //     .style("font-size", "12px")
    //     .style("font-weight", 700)
    //     .style("text-shadow", "0 0 3px rgba(0,0,0,0.6)")
    //     .text(d => `${((d[1] - d[0]) / 1000).toFixed(0)}K`);

    // layerG.selectAll("text.percentage-label")
    //     .data(d => d.filter(seg => seg[1] - seg[0] > 0))
    //     .join("text")
    //     .attr("x", d => x(d.data.quarter) + x.bandwidth() / 2)
    //     .attr("y", d => (y(d[0]) + y(d[1])) / 2 + 10)
    //     .attr("text-anchor", "middle")
    //     .attr("dominant-baseline", "middle")
    //     .style("fill", "#fff")
    //     .style("font-size", "12px")
    //     .style("font-weight", 600)
    //     .style("text-shadow", "0 0 3px rgba(0,0,0,0.6)")
    //     .text(d => {
    //         const val = d[1] - d[0];
    //         const pct = d.data.total ? Math.round((val / d.data.total) * 100) : 0;
    //         return `(${pct}%)`;
    //     });

    g.selectAll("text.total")
      .data(dataByQuarter)
      .join("text")
      .attr("x", (d) => x(d.quarter) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.total) - 8)
      .attr("text-anchor", "middle")
      .style("fill", theme.palette.text.primary)
      .style("font-size", "12px")
      .style("font-weight", 600)
      .text((d) => `$${(d.total / 1000).toFixed(0)}K`);

    const legend = svg
      .append("g")
      .attr("transform", `translate(${margin.left + w - 200}, 20)`);

    types.forEach((type, i) => {
      const row = legend
        .append("g")
        .attr("transform", `translate(0, ${i * 20})`);

      row
        .append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", COLORS[type] || d3.schemeCategory10[i % 10]);

      row
        .append("text")
        .attr("x", 20)
        .attr("y", 12)
        .style("font-size", "12px")
        .style("fill", theme.palette.text.primary)
        .text(type);
    });
  }, [data, width, height, theme]);

  return <svg ref={ref} />;
}

export default AccTyStackedBarChart;
