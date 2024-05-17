import Topbar from "../../components/Admin/layout/Topbar";
import Sidebar from "../../components/Admin/layout/Sidebar";

import SingleBookingDetails from "../../components/Admin/management/SingleBookingDetails";

function AdminSingleBookingView() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex flex-1 flex-col sm:flex-row">
        <div className="w-full sm:w-64 bg-fuchsia-700">
          <Sidebar />
        </div>

        <div className="flex-1 bg-gray-100">
          <div className="bg-white rounded-lg shadow-md ">
            <SingleBookingDetails />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSingleBookingView;
