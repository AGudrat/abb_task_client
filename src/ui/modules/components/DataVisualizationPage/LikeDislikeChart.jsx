import React, { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import dayjs from "dayjs";
import DateSelect from "../../blocks/DateSelect";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const likedCount = payload.find((p) => p.dataKey === "liked")?.value || 0;
    const dislikedCount =
      payload.find((p) => p.dataKey === "disliked")?.value || 0;
    const defaultCount =
      payload.find((p) => p.dataKey === "default")?.value || 0;

    return (
      <div className="custom-tooltip border-gray-300 rounded-md border bg-white p-4 shadow-lg">
        <p className="label text-lg font-semibold">{`Date: ${label}`}</p>
        <p className="intro text-gray-500 text-sm">Liked: {likedCount}</p>
        <p className="intro text-gray-500 text-sm">Disliked: {dislikedCount}</p>
        <p className="intro text-gray-500 text-sm">Not Rated: {defaultCount}</p>
      </div>
    );
  }
  return null;
};

const COLORS = ["#1d4ed8", "#dc2626", "#64748b"];

// Custom Legend Component
const CustomLegend = ({ payload }) => (
  <div className="mt-4 flex justify-center">
    {payload.map((entry, index) => (
      <div
        key={`legend-item-${index}`}
        className="mx-4 flex flex-row items-center gap-x-[8px]"
      >
        <div
          className="legend-color-box ml-2 h-4 w-4"
          style={{ backgroundColor: COLORS[index % COLORS.length] }}
        ></div>
        <span>{entry.value}</span>
      </div>
    ))}
  </div>
);

// Custom XAxis Tick Formatter
const CustomXAxisTick = ({ x, y, payload }) => {
  const formattedDate = dayjs(payload.value).format("MMM DD");
  return (
    <text x={x} y={y + 15} fill="#666" textAnchor="middle">
      {formattedDate}
    </text>
  );
};

// Function to group and count interactions by date
const groupByDate = (data) => {
  const groupedData = {};

  data.forEach((interaction) => {
    const date = dayjs(interaction.timestamp).format("YYYY-MM-DD");
    if (!groupedData[date]) {
      groupedData[date] = { liked: 0, disliked: 0, default: 0 };
    }

    if (interaction.type === "liked") {
      groupedData[date].liked += 1;
    } else if (interaction.type === "disliked") {
      groupedData[date].disliked += 1;
    } else {
      groupedData[date].default += 1;
    }
  });

  return Object.keys(groupedData).map((date) => ({
    date,
    liked: groupedData[date].liked,
    disliked: groupedData[date].disliked,
    default: groupedData[date].default,
  }));
};

// Function to filter data based on date range (last 7, 30, or 90 days)
const filterDataByDays = (data, days) => {
  const cutoffDate = dayjs().subtract(days, "day");
  return data.filter((interaction) =>
    dayjs(interaction.timestamp).isAfter(cutoffDate),
  );
};

// Main LikeDislikeChart Component
function LikeDislikeChart({ likeDislikeChartData }) {
  const [filteredData, setFilteredData] = useState([]);
  const [filterDays, setFilterDays] = useState(7); // Default is last 7 days

  useEffect(() => {
    if (likeDislikeChartData) {
      // Add the `type` field to each interaction for filtering
      const allInteractions = [
        ...likeDislikeChartData.liked.map((item) => ({
          ...item,
          type: "liked",
        })),
        ...likeDislikeChartData.disliked.map((item) => ({
          ...item,
          type: "disliked",
        })),
        ...likeDislikeChartData.default.map((item) => ({
          ...item,
          type: "default",
        })),
      ];

      // Filter the data based on the selected date range
      const filtered = filterDataByDays(allInteractions, filterDays);
      setFilteredData(groupByDate(filtered));
    }
  }, [likeDislikeChartData, filterDays]);

  const handleFilterChange = (e) => {
    setFilterDays(parseInt(e.target.value));
  };

  return (
    <div className="h-[600px] w-full rounded-[10px] bg-black p-[16px]">
      {/* Dropdown for filtering the data */}
      <DateSelect filterDays={filterDays} setFilterDays={setFilterDays} />

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={filteredData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={<CustomXAxisTick />} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          {/* Liked Bar */}
          <Bar
            barSize={30}
            radius={[10, 10, 0, 0]}
            dataKey="liked"
            name="Liked Interactions"
            fill="#1d4ed8"
          />

          {/* Disliked Bar */}
          <Bar
            barSize={30}
            radius={[10, 10, 0, 0]}
            dataKey="disliked"
            name="Disliked Interactions"
            fill="#dc2626"
          />

          {/* Default Bar */}
          <Bar
            barSize={30}
            radius={[10, 10, 0, 0]}
            dataKey="default"
            name="Not Rated"
            fill="#64748b"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LikeDislikeChart;
