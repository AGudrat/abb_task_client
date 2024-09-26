import { ChartBarIcon } from "@heroicons/react/24/outline";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom Tooltip Component for the words chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const count = payload[0]?.value || 0;

    return (
      <div className="custom-tooltip border-gray-300 rounded-md border bg-white p-4 shadow-lg">
        <p className="label text-lg font-semibold">{`Word: ${label}`}</p>
        <p className="intro text-gray-500 text-sm">Count: {count}</p>
      </div>
    );
  }
  return null;
};

// Main TopWordsCart Component
function TopWordsCart({ top10WordsData }) {
  // Transform API response data to the correct format
  const transformedData = top10WordsData.map(([word, count]) => ({
    word,
    count,
  }));

  // Find the maximum count value in the data
  const maxCount = Math.max(...transformedData.map((item) => item.count));

  return (
    <div className="h-[600px] w-full rounded-[10px] bg-black p-[16px]">
      <div className="mb-4 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-center gap-x-[8px]">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-white bg-white">
            <ChartBarIcon width={20} />
          </div>
          <div className="flex flex-col  justify-center">
            <h2 className="text-lg font-medium text-white">User Reviews</h2>
            <p className="text-sm leading-3 text-white text-opacity-65">
              Top 10 most used words by users
            </p>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={transformedData} layout="vertical">
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          {/* Set the XAxis domain to [0, maxCount + padding] */}
          <XAxis type="number" domain={[0, maxCount + 2]} />
          {/* Change YAxis label color to white */}
          <YAxis
            type="category"
            dataKey="word"
            width={150}
            tick={{ fill: "white" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopWordsCart;
