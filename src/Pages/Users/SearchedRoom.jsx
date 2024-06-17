
import { useState } from "react";
import TopBar from "../../components/Sample/TopBar";
import Roomcard from "../../components/User/Roomcard";
import Sidebar from "../../components/User/Sidebar";

const SearchedRoom = () => {
  const [filteredDatas, setFilteredDatas] = useState([]);
  const handleFilterChange = (filters) => {

    setFilteredDatas(filters);
  };
  return (
    <div className="h-screen flex flex-col">
    <TopBar />
    <div className="flex flex-grow">
      <div className="w-full md:w-1/4 h-full overflow-y-auto">
        <Sidebar onFilterChange={handleFilterChange} />
      </div>
      <div className="w-full md:w-3/4 h-full overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-4">
          <Roomcard filteredDatas={filteredDatas} />
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default SearchedRoom;
