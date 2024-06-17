import { useState } from "react";

const Sidebar = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState({
    roomType: [],
    sortBy: "",
    rating: "",
  });

  const handleFilterChange = (key, value) => {
    setSelectedFilter((prevState) => {
      let newFilter = { ...prevState };

      if (key === "clear") {
        newFilter = { roomType: [], sortBy: "", rating: "" };
      } else if (key === "roomType") {
        const updatedRoomType = prevState.roomType.includes(value)
          ? prevState.roomType.filter((type) => type !== value)
          : [...prevState.roomType, value];
        newFilter.roomType = updatedRoomType;
      } else {
        newFilter[key] = value;
      }

      onFilterChange(newFilter);
      return newFilter;
    });
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 h-full relative sm:p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Filters</h3>
        <button
          onClick={() => handleFilterChange("clear", "clear")}
          className="bg-slate-500 text-white px-3 py-1 rounded-md shadow hover:bg-slate-600 text-sm"
        >
          Clear
        </button>
      </div>
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4">Room Type</h4>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {["Single", "Double", "Suite"].map((type) => (
            <label
              key={type}
              className="inline-flex items-center cursor-pointer sm:mr-4"
            >
              <input
                type="checkbox"
                className="form-checkbox text-blue-500 focus:ring-blue-500"
                value={type}
                checked={selectedFilter.roomType.includes(type)}
                onChange={() => handleFilterChange("roomType", type)}
              />
              <span className="ml-2 text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4">Sort By</h4>
        <select
          name="sortBy"
          className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={selectedFilter.sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
        >
          <option value="">Select Option</option>
          <option value="amount_asc">Low to High</option>
          <option value="amount_desc">High to Low</option>
        </select>
      </div>
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-4">Rating</h4>
        <select
          name="rating"
          className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={selectedFilter.rating}
          onChange={(e) => handleFilterChange("rating", e.target.value)}
        >
          <option value="">Select Rating</option>
          {["1", "2", "3", "4", "5"].map((star) => (
            <option key={star} value={star}>
              {star} star{star > 1 && "s"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;