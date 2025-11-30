import { LineChart } from "@mui/x-charts/LineChart";

function CardPriceChart({ pricing }) {
  const conversionRate = 1.16;
  const xLabels = ["Lowest", "Average", "7 Days", "30 Days", "Trend"];
  const yValues = [
    pricing.low * conversionRate,
    pricing.avg * conversionRate,
    pricing.avg7 * conversionRate,
    pricing.avg30 * conversionRate,
    pricing.trend * conversionRate,
  ];

  return (
    <LineChart
      width={400}
      height={240}
      series={[
        {
          data: yValues,
          color: "#ef4444", // 🔴 line color
          area: true,       // enable area for this series
        },
      ]}
      xAxis={[
        {
          scaleType: "band",
          data: xLabels,
        },
      ]}
      sx={{
        // use gradient for the area, not solid color
        "& .MuiAreaElement-root": {
          fill: "url(#redGradient)",
          fillOpacity: 1,
        },

        // X & Y axis text labels
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
        // Optional grid styling
        "& .MuiChartsGrid-line": {
          stroke: "rgba(255, 255, 255, 0.2)",
        },
        // Legend (top label)
        "& .MuiChartsLegend-root text, & .MuiChartsLegend-root tspan": {
          fill: "white !important",
          fontWeight: 600,
        },
      }}
    >
      {/* 🔴 define the gradient INSIDE the chart */}
      <defs>
        <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
          {/* top = red */}
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
          {/* bottom = transparent */}
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </linearGradient>
      </defs>
    </LineChart>
  );
}

export default CardPriceChart;
