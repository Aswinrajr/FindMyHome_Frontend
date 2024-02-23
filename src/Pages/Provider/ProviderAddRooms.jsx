import Topbar from "../../components/Provider/layout/Topbar";
import Sidebar from "../../components/Provider/layout/Sidebar";
import AddRooms from "../../components/Provider/AddRooms";

function ProviderAddRooms() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex flex-1 flex-col sm:flex-row">
        <div className="w-full sm:w-64 bg-fuchsia-700">
          <Sidebar />
        </div>

        <div className="flex-1 p-4 bg-gray-100">
          <h1 className="text-2xl font-semibold mb-4">Add Rooms</h1>
          <div className="bg-white rounded-lg shadow-md p-4">
            <AddRooms />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderAddRooms;
