import React, { useState } from "react";

// Table to display user interactions with filters and pagination
function UserInteractionTable({ interactions }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [questionFilter, setQuestionFilter] = useState("");
  const [answerFilter, setAnswerFilter] = useState("");
  const [questionSize, setQuestionSize] = useState(10); // Default to 10 questions

  // Filter interactions based on the date range, question content, and answer content
  const filteredInteractions = interactions.filter((interaction) => {
    const interactionDate = new Date(interaction.timestamp);

    // Filter by date range
    const isWithinDateRange =
      (!startDate || interactionDate >= new Date(startDate)) &&
      (!endDate || interactionDate <= new Date(endDate));

    // Filter by question
    const isQuestionMatched = interaction.question
      .toLowerCase()
      .includes(questionFilter.toLowerCase());

    // Filter by answer
    const isAnswerMatched = interaction.answer
      .toLowerCase()
      .includes(answerFilter.toLowerCase());

    return isWithinDateRange && isQuestionMatched && isAnswerMatched;
  });

  // Limit the displayed interactions to the selected question size
  const displayedInteractions = filteredInteractions.slice(0, questionSize);

  return (
    <div className="overflow-x-auto w-full rounded-[10px] bg-black p-4">
      {/* Filters */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-sm text-white">Start Date:</label>
          <input
            type="date"
            className="w-full rounded-[6px] border border-white px-2 py-1 outline-none"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-white">End Date:</label>
          <input
            type="date"
            className="w-full rounded-[6px] border border-white px-2 py-1 outline-none"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-white">Question Filter:</label>
          <input
            type="text"
            className="w-full rounded-[6px] border border-white px-2 py-1 outline-none"
            placeholder="Search by question"
            value={questionFilter}
            onChange={(e) => setQuestionFilter(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-white">Answer Filter:</label>
          <input
            type="text"
            className="w-full rounded-[6px] border border-white px-2 py-1 outline-none"
            placeholder="Search by answer"
            value={answerFilter}
            onChange={(e) => setAnswerFilter(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-white">
            Questions Per Page:
          </label>
          <select
            className="h-[34px] w-max rounded-[6px] border border-white bg-white px-2 py-1 outline-none"
            value={questionSize}
            onChange={(e) => setQuestionSize(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full border-collapse overflow-hidden rounded-[10px] border border-white text-left text-sm text-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="border border-white px-4 py-2 text-white">
              Session ID
            </th>
            <th className="border border-white px-4 py-2 text-white">
              Question
            </th>
            <th className="border border-white px-4 py-2 text-white">Answer</th>
            <th className="border border-white px-4 py-2 text-white">
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedInteractions.length > 0 ? (
            displayedInteractions.map((interaction, index) => (
              <tr key={index} className="odd:bg-gray-100 even:bg-gray-200">
                <td className="border border-white px-4 py-2 text-white">
                  {interaction.session_id}
                </td>
                <td className="border border-white px-4 py-2 text-white">
                  {interaction.question}
                </td>
                <td className="border border-white px-4 py-2 text-white">
                  {interaction.answer}
                </td>
                <td className="border border-white px-4 py-2 text-white">
                  {new Date(interaction.timestamp).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 text-center text-white">
                No interactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserInteractionTable;
