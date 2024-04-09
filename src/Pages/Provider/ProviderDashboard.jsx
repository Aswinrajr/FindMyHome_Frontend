import Topbar from "../../components/Provider/layout/Topbar";
import Sidebar from "../../components/Provider/layout/Sidebar";
import DashboardPage from "../../components/Provider/Dashboard";

import { useEffect } from "react";

import { axiosInstance } from "../../api/axios";

function ProviderDashboard() {
  let token = localStorage.getItem("providerAccessToken");
  console.log("Token in provider dashbpard", token);
  const newToken = JSON.parse(token);
  token = newToken?.providerAccessToken;
  console.log("New Token provider", token);

  useEffect(() => {
    console.log("Welcome to complete data");
    try {
      const completeData = async () => {
        const response = await axiosInstance.get(
          "/provider/completedata",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      };
      completeData();
    } catch (err) {
      console.log(err);
    }
  }, []);

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
            <DashboardPage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderDashboard;
