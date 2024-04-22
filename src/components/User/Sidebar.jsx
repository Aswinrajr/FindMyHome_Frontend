import { useState } from "react";

const Sidebar = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    onFilterChange(value);
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg p-4 h-full flex flex-col gap-4">
      <div className="font-bold">
        <h3 className="text-lg mb-2">Filters</h3>
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex items-center">
          <input
            type="radio"
            className="form-radio mr-2"
            name="roomType"
            value="Single"
            checked={selectedFilter === "Single"}
            onChange={() => handleFilterChange("Single")}
          />
          <span className="text-sm">Single</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            className="form-radio mr-2"
            name="roomType"
            value="Double"
            checked={selectedFilter === "Double"}
            onChange={() => handleFilterChange("Double")}
          />
          <span className="text-sm">Double</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            className="form-radio mr-2"
            name="roomType"
            value="Suite"
            checked={selectedFilter === "Suite"}
            onChange={() => handleFilterChange("Suite")}
          />
          <span className="text-sm">Suite</span>
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <label>
          Sort By:
          <select
            name="sortBy"
            className="border rounded bg-gray-700 text-white p-2 ml-4"
            value={selectedFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="low_to_high">Low to High</option>
            <option value="high_to_low">High to Low</option>
          </select>
        </label>
        <label>
          Rating:
          <select
            name="rating"
            className="border rounded bg-gray-700 text-white p-2 ml-5 mt-3"
            value={selectedFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
