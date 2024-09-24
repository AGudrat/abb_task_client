"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DataVisualizationPage() {
  const [interactions, setInteractions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/interactions/")
      .then((response) => response.json())
      .then((data) => {
        setInteractions(data);
      })
      .catch((error) => console.error("Error fetching interactions:", error));
  }, []);

  // Filter interactions based on date range
  const filteredInteractions = interactions.filter((interaction) => {
    const interactionDate = new Date(interaction.timestamp);
    if (startDate && interactionDate < startDate) return false;
    if (endDate && interactionDate > endDate) return false;
    return true;
  });

  /** Data Processing for Charts **/

  // 1. Interactions Over Time
  const interactionsByDate = filteredInteractions.reduce((acc, interaction) => {
    const date = new Date(interaction.timestamp).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const interactionsChartData = Object.entries(interactionsByDate).map(
    ([date, count]) => ({
      date,
      count,
    }),
  );

  // 2. Question Length Distribution
  const questionLengths = filteredInteractions.map(
    (interaction) => interaction.question.length,
  );
  const bins = [0, 50, 100, 150, 200, 250, 300, 350];

  const histogramData = bins.map((bin, index) => {
    const nextBin = bins[index + 1] || Infinity;
    const count = questionLengths.filter(
      (length) => length >= bin && length < nextBin,
    ).length;
    return {
      range: `${bin} - ${nextBin !== Infinity ? nextBin : "+"}`,
      count,
    };
  });

  // 3. Top 10 Frequent Words
  const wordCounts = filteredInteractions.reduce((acc, interaction) => {
    const words = interaction.question.toLowerCase().match(/\b\w+\b/g);
    if (words) {
      words.forEach((word) => {
        if (word.length > 2) {
          acc[word] = (acc[word] || 0) + 1;
        }
      });
    }
    return acc;
  }, {});

  const wordData = Object.entries(wordCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div className="data-visualization">
      <h1>Data Visualization</h1>

      {/* Date Range Filter */}
      <div className="filter-section">
        <h3>Filter by Date Range:</h3>
        <ReactDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <ReactDatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
        />
      </div>

      {/* Interactions Over Time */}
      <h2>Interactions Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={interactionsChartData}>
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            name="Interactions"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Question Length Distribution */}
      <h2>Question Length Distribution</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={histogramData}>
          <XAxis dataKey="range" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="count" fill="#82ca9d" name="Questions" />
        </BarChart>
      </ResponsiveContainer>

      {/* Top 10 Most Frequent Words */}
      <h2>Top 10 Most Frequent Words</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={wordData} layout="vertical">
          <XAxis type="number" allowDecimals={false} />
          <YAxis type="category" dataKey="word" />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="count" fill="#8884d8" name="Occurrences" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DataVisualizationPage;
