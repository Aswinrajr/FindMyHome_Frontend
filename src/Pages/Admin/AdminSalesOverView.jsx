import Topbar from "../../components/Admin/layout/Topbar";
import Sidebar from "../../components/Admin/layout/Sidebar";

import AdminSalesAnalytics from "../../components/Admin/profile/AdminSalesAnalytics";

function AdminSalesOverView() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex flex-1">
        <div className="w-64 bg-fuchsia-700">
          <Sidebar />
        </div>

        <div className="flex-1 bg-gray-100 p-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <AdminSalesAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSalesOverView;
