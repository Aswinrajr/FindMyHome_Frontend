import TopBar from "../../components/Sample/TopBar";
import Roomcard from "../../components/User/Roomcard";
import Sidebar from "../../components/User/Sidebar";

const SearchedRoom = () => {
  return (
    <div className="h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-grow">
        <div className="w-1/4 h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="w-3/4 h-full overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
            <Roomcard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedRoom;
