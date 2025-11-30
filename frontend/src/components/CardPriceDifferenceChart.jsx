import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts";

function CardPriceDifferenceChart({ pricing }) {
  if (!pricing) return null;

  const conversionRate = 1.16; // EUR → USD

  // X axis labels
  const xLabels = ["7D", "30D", "Trend"];

  // Baseline: current average price (same for each category)
  const avgUSD = pricing.avg * conversionRate;

  // Comparison values in USD
  const avg7USD = pricing.avg7 * conversionRate;
  const avg30USD = pricing.avg30 * conversionRate;
  const trendUSD = pricing.trend * conversionRate;

  // Decide colors based on comparison vs avg
  const color7 = avg7USD >= avgUSD ? "#ef4444" : "#22c55e";
  const color30 = avg30USD >= avgUSD ? "#ef4444" : "#22c55e";
  const colorTrend = trendUSD >= avgUSD ? "#ef4444" : "#22c55e";

  return (
    <BarChart
      width={400}
      height={240}
      legend={{ hidden: true }}
      xAxis={[
        {
          scaleType: "band",
          data: xLabels,
        },
      ]}
      yAxis={[{ width: 60 }]}
      series={[
        {
          id: "avg",
          label: "Avg ($)",
          data: [avgUSD, avgUSD, avgUSD],
          color: "#e5e7eb", // light gray
        },
        {
          id: "avg7",
          label: "7D Avg ($)",
          data: [avg7USD, null, null],
          color: color7, // red or green
        },
        {
          id: "avg30",
          label: "30D Avg ($)",
          data: [null, avg30USD, null],
          color: color30,
        },
        {
          id: "trend",
          label: "Trend ($)",
          data: [null, null, trendUSD],
          color: colorTrend,
        },
      ]}
      sx={{
        // Axis label text
        "& .MuiChartsAxis-root text": {
          fill: "white",
        },
        // Axis lines
        "& .MuiChartsAxis-line": {
          stroke: "white",
        },
        // Tick marks
        "& .MuiChartsAxis-tick": {
          stroke: "white",
        },
        // Grid lines
        "& .MuiChartsGrid-line": {
          stroke: "rgba(255, 255, 255, 0.15)",
        },
        // Legend text
        "& .MuiChartsLegend-root": {
          display: "none !important",
        },
      }}
    />
  );
}

export default CardPriceDifferenceChart;
