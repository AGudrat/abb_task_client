import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import dayjs from "dayjs";
import DateSelect from "../../blocks/DateSelect";
import { PresentationChartLineIcon } from "@heroicons/react/24/outline";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const count = payload[0]?.value || 0;

    return (
      <div className="custom-tooltip border-gray-300 rounded-md border bg-white p-4 shadow-lg">
        <p className="label text-lg font-semibold">{`Date: ${label}`}</p>
        <p className="intro text-gray-500 text-sm">Interactions: {count}</p>
      </div>
    );
  }
  return null;
};

// Custom XAxis Tick Formatter
const CustomXAxisTick = ({ x, y, payload }) => {
  const formattedDate = dayjs(payload.value).format("MMM DD");
  return (
    <text x={x} y={y + 15} fill="#666" textAnchor="middle">
      {formattedDate}
    </text>
  );
};

// Function to filter data based on date range (last 7, 30, or 90 days)
const filterDataByDays = (data, days) => {
  const cutoffDate = dayjs().subtract(days, "day");
  return data.filter((interaction) =>
    dayjs(interaction.date).isAfter(cutoffDate),
  );
};

// Main InteractionOverTimeChart Component
function InteractionOverTimeChart({ interactionsOverTime }) {
  const [filteredData, setFilteredData] = useState([]);
  const [filterDays, setFilterDays] = useState(7); // Default is last 7 days

  useEffect(() => {
    if (interactionsOverTime) {
      // Filter the data based on the selected date range
      const filtered = filterDataByDays(interactionsOverTime, filterDays);
      setFilteredData(filtered);
    }
  }, [interactionsOverTime, filterDays]);

  // Get the min and max for the count values dynamically to limit Y-axis
  const minCount = Math.min(...filteredData.map((d) => d.count));
  const maxCount = Math.max(...filteredData.map((d) => d.count));

  return (
    <div className="h-[600px] w-full rounded-[10px] bg-black p-[16px]">
      <div className="mb-4  flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-center gap-x-[8px]">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-white bg-white">
            <PresentationChartLineIcon width={20} />
          </div>
          <div className="flex flex-col  justify-center">
            <h2 className="text-lg font-medium text-white">
              User Interactions
            </h2>
            <p className="text-sm leading-3 text-white text-opacity-65">
              All user interaction counts
            </p>
          </div>
        </div>
        {/* Dropdown for filtering the data */}
        <DateSelect filterDays={filterDays} setFilterDays={setFilterDays} />
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={filteredData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={<CustomXAxisTick />} />
          <YAxis domain={[Math.max(0, minCount - 1), maxCount + 1]} />
          <Tooltip content={<CustomTooltip />} />

          {/* Area for Interactions */}
          <Area
            type="monotone"
            dataKey="count"
            name="Interactions Over Time"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default InteractionOverTimeChart;
