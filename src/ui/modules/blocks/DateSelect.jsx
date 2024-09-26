import React from "react";

function DateSelect({ filterDays, setFilterDays }) {
  const handleFilterChange = (e) => {
    setFilterDays(parseInt(e.target.value));
  };

  return (
    <div className="mb-4  flex justify-end">
      <select
        className="rounded-md border bg-white bg-opacity-[9%] p-2 text-white text-opacity-80"
        value={filterDays}
        onChange={handleFilterChange}
      >
        <option className="text-black" value={7}>
          Last 7 days
        </option>
        <option className="text-black" value={30}>
          Last 30 days
        </option>
        <option className="text-black" value={90}>
          Last 90 days
        </option>
      </select>
    </div>
  );
}

export default DateSelect;
