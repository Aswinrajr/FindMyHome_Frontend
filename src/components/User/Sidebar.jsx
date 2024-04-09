import { useState } from "react";

const Sidebar = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    onFilterChange(value);
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-md rounded-lg p-4 h-full flex flex-col gap-4">
      <div className="font-bold text-white">
        <h3>Filters</h3>
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex items-center text-white">
          <input
            type="radio"
            className="form-radio mr-2"
            name="roomType"
            value="Single"
            checked={selectedFilter === "Single"}
            onChange={() => handleFilterChange("Single")}
          />
          <span>Single</span>
        </label>
        <label className="flex items-center text-white">
          <input
            type="radio"
            className="form-radio mr-2"
            name="roomType"
            value="Double"
            checked={selectedFilter === "Double"}
            onChange={() => handleFilterChange("Double")}
          />
          <span>Double</span>
        </label>
        <label className="flex items-center text-white">
          <input
            type="radio"
            className="form-radio mr-2"
            name="roomType"
            value="Suite"
            checked={selectedFilter === "Suite"}
            onChange={() => handleFilterChange("Suite")}
          />
          <span>Suite</span>
        </label>
      </div>
      <label className="flex items-center mb-1 text-white">
        <span className="text-sm">Sort By:</span>
        <select
          name="sortBy"
          className="flex-grow mt-1 ml-2 border rounded bg-white text-gray-700"
          value={selectedFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="low_to_high">Low to High</option>
          <option value="high_to_low">High to Low</option>
        </select>
      </label>
      <label className="flex items-center mb-1 text-white">
        <span className="text-sm">Rating:</span>
        <select
          name="rating"
          className="flex-grow mt-1 ml-2 border rounded bg-white text-gray-700"
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
  );
};

export default Sidebar;
