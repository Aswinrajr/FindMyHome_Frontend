import Topbar from "../layout/Topbar";
import Sidebar from "../layout/Sidebar";
import AdminDashboard from "./AdminDashboard";

function UserPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-1 flex-col sm:flex-row">
        <div className="w-full sm:w-64 bg-fuchsia-700">
          <Sidebar />
        </div>

        <div className="flex-1 p-4 bg-gray-100">
          <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
          <div className="bg-white rounded-lg shadow-md p-4">
            <AdminDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
