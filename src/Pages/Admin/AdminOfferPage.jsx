import Topbar from "../../components/Admin/layout/Topbar";
import Sidebar from "../../components/Admin/layout/Sidebar";
import AdminOffers from "../../components/Admin/management/AdminOffers";


function AdminProfilePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex flex-1 flex-col sm:flex-row">
        <div className="w-full sm:w-64 bg-fuchsia-700">
          <Sidebar />
        </div>
        <AdminOffers/>
      </div>
    </div>
  );
}

export default AdminProfilePage;
