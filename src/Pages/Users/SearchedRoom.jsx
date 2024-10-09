import { useState, useEffect, useRef } from "react";
import TopBar from "../../components/Sample/TopBar";
import Roomcard from "../../components/User/Roomcard";
import Sidebar from "../../components/User/Sidebar";
import { HiOutlineMenu } from "react-icons/hi";

const SearchedRoom = () => {
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const contentRef = useRef(null);

  const handleFilterChange = (filters) => {
    setFilteredDatas(filters);
    setIsSidebarOpen(false); 
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isSidebarOpen) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isSidebarOpen]);

  return (
    <div className="h-screen flex flex-col relative">
      <TopBar />
      <div className="flex flex-grow" ref={contentRef}>
     
        {!isSidebarOpen && (
          <div className="md:hidden fixed top-36 left-4 z-50">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg focus:outline-none"
              onClick={toggleSidebar}
            >
              <HiOutlineMenu className="w-6 h-6" />
            </button>
          </div>
        )}
        
       
        <div
          className={`bg-gray-900 text-white rounded-lg shadow-lg p-6 h-full absolute inset-y-0 left-0 z-40 md:static md:h-auto md:shadow-none md:rounded-none md:p-0 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
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
