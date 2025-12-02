import { PieChart } from "@mui/x-charts/PieChart";
import { useState, useEffect } from "react";
import PieChartIcon from "@mui/icons-material/PieChart";

function DiversityChart() {
  const [data, setSetCounts] = useState([]);

  const chartSize = 150;

  const setMap = {
    sv01: "Scarlet & Violet",
    sv02: "Paldea Evolved",
    sv03: "Obsidian Flames",
    "sv03.5": "151",
    sv04: "Paradox Rift",
    "sv04.5": "Paldean Fates",
    sv05: "Temporal Forces",
    sv06: "Twilight Masquerade",
    "sv06.5": "Shrouded Fable",
    sv07: "Stellar Crown",
    sv08: "Surging Sparks",
    "sv08.5": "Prismatic Evolutions",
    sv09: "Journey Together",
    sv10: "Destined Rivals",
    "sv10.5b": "Black Bolt",
    "sv10.5w": "White Flare",
    me01: "Mega Evolution",
    me02: "Phantasmal Flames",
  };

  const setColorMap = {
    "Scarlet & Violet": "#38bdf8",
    "Paldea Evolved": "#a855f7",
    "Obsidian Flames": "#f97316",
    151: "#22c55e",
    "Paradox Rift": "#eab308",
    "Paldean Fates": "#f472b6",
    "Temporal Forces": "#fb7185",
    "Twilight Masquerade": "#2dd4bf",
    "Shrouded Fable": "#c4b5fd",
    "Stellar Crown": "#facc15",
    "Surging Sparks": "#4ade80",
    "Prismatic Evolutions": "#fbbf24",
    "Journey Together": "#94a3b8",
    "Destined Rivals": "#f97373",
    "Black Bolt": "#22d3ee",
    "White Flare": "#e5e5e5",
    "Mega Evolution": "#f9a8d4",
    "Phantasmal Flames": "#fb7185",
  };

  const fallbackColors = [
    "#38bdf8",
    "#a855f7",
    "#f97316",
    "#22c55e",
    "#eab308",
    "#f472b6",
    "#2dd4bf",
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user || !user.binder) return;

    const counts = {};

    user.binder.forEach((card) => {
      const setId = card.id.split("-")[0];
      const setName = setMap[setId] || setId;

      if (!counts[setName]) counts[setName] = 0;
      counts[setName]++;
    });

    const result = Object.entries(counts).map(([label, value], index) => ({
      label,
      value,
      color:
        setColorMap[label] || fallbackColors[index % fallbackColors.length],
    }));

    setSetCounts(result);
  }, []);

  return (
    <div className="flex flex-col bg-gray-800 rounded-xl">
      <div className="w-full p-4 flex justify-center items-center gap-1">
        <PieChartIcon />
        <p className="font-semibold">Portfolio Diversity</p>
      </div>
      <div className="w-full rounded-xl p-4 flex items-center justify-center row-span-2">
        <div className="bg-gray-700 rounded-xl min-w-[90%] sm:max-w-[190px] flex items-center justify-center p-4">
          <PieChart
            series={[
              {
                startAngle: -90,
                endAngle: 270,
                data,
                arcLabel: (item) => item.value,
              },
            ]}
            height={chartSize}
            width={chartSize}
            sx={{
              "& .MuiChartsLegend-label": {
                fill: "white",
                color: "white",
                fontWeight: "bold"
              },
            }}
            slotProps={{
              legend: {
                labelStyle: { fill: "white" },
              },
              pieArcLabel: {
                style: { fill: "white", fontSize: 11 },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DiversityChart;
