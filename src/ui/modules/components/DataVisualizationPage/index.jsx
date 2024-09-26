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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LikeDislikeChart from "./LikeDislikeChart";
import InteractionOverTimeChart from "./InteractionOverTimeChart";
import TopWordsChart from "./TopWordsChart";
import UserInteractionTable from "./UserInteractionTable";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

function DataVisualizationPage() {
  const router = useRouter();
  const [interactions, setInteractions] = useState([]);
  const [interactionsOverTime, setInteractionsOverTime] = useState([]);
  const [topWords, setTopWords] = useState([]);
  const [likedDislikedData, setLikedDislikedData] = useState({
    liked: [],
    disliked: [],
    default: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/interactions/")
      .then((response) => response.json())
      .then((data) => {
        setInteractions(data.interactions);
        setInteractionsOverTime(data.interactions_over_time);
        setTopWords(data.top_10_most_frequent_words);
        setLikedDislikedData(data.liked_disliked_interactions); // Directly set liked/disliked data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching interactions:", error);
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="data-visualization container mb-10 grid grid-cols-12 gap-[16px] pt-10">
      <div
        onClick={() => router.push("/")}
        className="col-span-12 flex w-[250px] cursor-pointer flex-row items-center justify-center gap-x-[8px] rounded-[10px] bg-black px-[16px] py-[8px] text-white"
      >
        <ArrowLeftStartOnRectangleIcon width={20} />
        <p>Back To Chat View</p>
      </div>
      <div className="col-span-12 flex md:col-span-6">
        <InteractionOverTimeChart interactionsOverTime={interactionsOverTime} />
      </div>
      <div className="col-span-12 flex md:col-span-6">
        <TopWordsChart top10WordsData={topWords} />
      </div>
      <div className="col-span-12 flex">
        <LikeDislikeChart likeDislikeChartData={likedDislikedData} />
      </div>
      <div className="col-span-12 flex">
        <UserInteractionTable interactions={interactions} />
      </div>
    </div>
  );
}

export default DataVisualizationPage;
