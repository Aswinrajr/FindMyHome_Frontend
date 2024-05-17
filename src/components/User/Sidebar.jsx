import { useState } from "react";

const Sidebar = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState({
    roomType: "",
    sortBy: "",
    rating: "",
  });

  const handleFilterChange = (key, value) => {
    if(key==="clear"){
      setSelectedFilter("")
      
    }
    setSelectedFilter((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    onFilterChange(value);
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 h-full relative">
      <h3 className="text-xl font-semibold mb-6">Filters</h3>
      <button
      onClick={()=>handleFilterChange("clear","clear")}

        className="absolute top-4 right-2 bg-slate-500 text-white px-4 py-2 rounded-lg shadow hover:bg-slate-600"
      >
        Clear selection
      </button>


      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4">Room Type</h4>
        <div className="flex flex-col gap-2">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio text-blue-500 focus:ring-blue-500"
              name="roomType"
              value="Single"
              checked={selectedFilter.roomType === "Single"}
              onClick={() => handleFilterChange("roomType", "Single")}
            />
            <span className="ml-2 text-sm">Single</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio text-blue-500 focus:ring-blue-500"
              name="roomType"
              value="Double"
              checked={selectedFilter.roomType === "Double"}
              onClick={() => handleFilterChange("roomType", "Double")}
            />
            <span className="ml-2 text-sm">Double</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio text-blue-500 focus:ring-blue-500"
              name="roomType"
              value="Suite"
              checked={selectedFilter.roomType === "Suite"}
              onClick={() => handleFilterChange("roomType", "Suite")}
            />
            <span className="ml-2 text-sm">Suite</span>
          </label>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4">Sort By</h4>
        <select
          name="sortBy"
          className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={selectedFilter.sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
        >
          <option value="">Select Option</option>
          <option value="low_to_high">Low to High</option>
          <option value="high_to_low">High to Low</option>
        </select>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-4">Rating</h4>
        <select
          name="rating"
          className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={selectedFilter.rating}
          onChange={(e) => handleFilterChange("rating", e.target.value)}
        >
          <option value="">Select Rating</option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;