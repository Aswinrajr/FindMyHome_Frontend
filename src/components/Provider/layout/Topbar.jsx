import { useState } from "react";

import logoImage from "../../../assets/logo.png";
import profilePic from "../../../assets/roomimage.webp";

const Topbar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {};

  return (
    <div className="bg-fuchsia-700 text-white px-4 py-2 flex items-center justify-between sm:px-6 lg:px-8">
      <div className="flex items-center">
        <img src={logoImage} alt="Logo" className="h-8 mr-4" />
      </div>

      <div className="flex flex-grow items-center justify-center">
        <div className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search..."
            className="bg-white text-gray-800 rounded-md pl-8 pr-3 py-2 focus:outline-none sm:text-sm"
            style={{ minWidth: "200px" }}
          />
          <button
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <img src={profilePic} alt="Profile" className="h-8 rounded-full mr-4" />
      </div>
    </div>
  );
};

export default Topbar;
