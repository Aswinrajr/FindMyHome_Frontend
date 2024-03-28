import Topbar from "../../components/Provider/layout/Topbar";
import Sidebar from "../../components/Provider/layout/Sidebar";
import DashboardPage from "../../components/Provider/Dashboard";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";

function ProviderDashboard() {
  const provider = useSelector((state) => state.providerAuth.provider);
  useEffect(() => {
    console.log("Welcome to complete data");
    try {
      const completeData = async () => {
        const response = await axios.get(
          "http://localhost:1997/provider/completedata",
          { provider }
        );
        console.log(response);
      };
      completeData();
    } catch (err) {
      console.log(err);
    }
  }, [provider]);

  return (
    <div className="flex flex-col min-h-screen">
      {provider && <Navigate to="/provider/dashboard" />}
      <Topbar />

      <div className="flex flex-1 flex-col sm:flex-row">
        <div className="w-full sm:w-64 bg-fuchsia-700">
          <Sidebar />
        </div>

        <div className="flex-1 p-4 bg-gray-100">
          <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
          <div className="bg-white rounded-lg shadow-md p-4">
            <DashboardPage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderDashboard;
