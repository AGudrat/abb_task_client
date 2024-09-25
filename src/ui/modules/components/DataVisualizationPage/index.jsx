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
  Legend,
} from "recharts";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DataVisualizationPage() {
  const [interactions, setInteractions] = useState([]);
  const [interactionsOverTime, setInteractionsOverTime] = useState([]);
  const [questionLengthDistribution, setQuestionLengthDistribution] = useState({});
  const [topWords, setTopWords] = useState([]);
  const [likedDislikedData, setLikedDislikedData] = useState({ liked: [], disliked: [] });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/interactions/")
      .then((response) => response.json())
      .then((data) => {
        setInteractions(data.interactions); // Set interactions
        setInteractionsOverTime(data.interactions_over_time); // Set interactions over time
        setQuestionLengthDistribution(data.question_length_distribution); // Set question length distribution
        setTopWords(data.top_10_most_frequent_words); // Set top 10 most frequent words
        setLikedDislikedData(data.liked_disliked_interactions); // Set liked and disliked data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching interactions:", error);
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, []);

  const filteredInteractions = interactions.filter((interaction) => {
    const interactionDate = new Date(interaction.timestamp);
    if (startDate && interactionDate < startDate) return false;
    if (endDate && interactionDate > endDate) return false;
    return true;
  });

  // Question Length Distribution Data (convert to array format for BarChart)
  const bins = Object.keys(questionLengthDistribution).map((key) => ({
    range: key,
    count: questionLengthDistribution[key],
  }));

  // Top 10 Most Frequent Words
  const wordData = topWords.map(([word, count]) => ({
    word,
    count,
  }));

  // Like/Dislike Chart Data
  const likeDislikeChartData = [
    { name: "Liked", count: likedDislikedData.liked.length },
    { name: "Disliked", count: likedDislikedData.disliked.length },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
        <LineChart data={interactionsOverTime}>
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip
            formatter={(value, name) => [value, name]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#82ca9d"
            name="Interactions"
          />
          <Legend />
        </LineChart>
      </ResponsiveContainer>

      {/* Question Length Distribution */}
      <h2>Question Length Distribution</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={bins}>
          <XAxis dataKey="range" />
          <YAxis allowDecimals={false} />
          <Tooltip formatter={(value, name) => [`${value} Questions`, name]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="count" fill="#8884d8" name="Questions" />
          <Legend />
        </BarChart>
      </ResponsiveContainer>

      {/* Top 10 Most Frequent Words */}
      <h2>Top 10 Most Frequent Words</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={wordData} layout="vertical">
          <XAxis type="number" allowDecimals={false} />
          <YAxis type="category" dataKey="word" />
          <Tooltip formatter={(value, name) => [`${value} Occurrences`, name]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="count" fill="#82ca9d" name="Occurrences" />
          <Legend />
        </BarChart>
      </ResponsiveContainer>

      {/* Like/Dislike Chart */}
      <h2>Likes vs Dislikes</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={likeDislikeChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" name="Interactions" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DataVisualizationPage;
