import React, { useEffect } from "react";
import Topbar from "../../components/Provider/layout/Topbar";
import Sidebar from "../../components/Provider/layout/Sidebar";
import DashboardPage from "../../components/Provider/Dashboard";
import { providerInstance } from "../../api/providerAxiosInstance";

function ProviderDashboard() {
  let token = localStorage.getItem("providerAccessToken");
  console.log("Token in provider dashboard", token);
  const newToken = JSON.parse(token);
  token = newToken?.providerAccessToken;
  console.log("New Token provider", token);

  useEffect(() => {
    console.log("Welcome to complete data");
    try {
      const completeData = async () => {
        const response = await providerInstance.get(
          "/completedata",
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
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex flex-1 flex-col sm:flex-row">
        <div className="w-full sm:w-64 bg-gray-900">
          <Sidebar />
        </div>

        <div className="flex-1 p-4 bg-gray-100">
          <div className="bg-white rounded-lg shadow-md p-4">
            <DashboardPage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderDashboard;
