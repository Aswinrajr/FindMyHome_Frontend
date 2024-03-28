import Topbar from "../../components/Admin/layout/Topbar";
import Sidebar from "../../components/Admin/layout/Sidebar";
import Users from "../../components/Admin/Users";

function UserPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex flex-1 flex-col sm:flex-row">
        <div className="w-full sm:w-64 bg-fuchsia-700">
          <Sidebar />
        </div>

        <div className="flex-1 p-4 bg-gray-100">
          <h1 className="text-2xl font-semibold mb-4">User List</h1>
          <div className="bg-white rounded-lg shadow-md p-4">
            <Users />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
