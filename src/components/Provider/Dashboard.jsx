import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaDollarSign, FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import {
  completeDatas,
  getSaleAnalysisProvider,
  providerDashboard,
} from "../../service/Provider/LoginService";
import ChartComponent from "./ProviderChart";

const Dashboard = () => {
  const navigate = useNavigate();
  const [salesData, setSalesData] = useState({});

  const [filterOption, setFilterOption] = useState("");
  let token = localStorage.getItem("providerAccessToken");
  const newToken = JSON.parse(token);
  token = newToken?.providerAccessToken;

  useEffect(() => {
    const completeData = async () => {
      try {
        const response = await completeDatas();
        console.log(response);
        if (response.data.msg === "Complete your profile Data") {
          Swal.fire({
            title: "Profile Updation Pending!!",
            text: "Complete Your Profile Info",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Go to profile",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/provider/profileedit");
            }
          });
        }
      } catch (error) {
        console.error("Error completing data:", error);
      }
    };

    const fetchData = async () => {
      try {
        const data = await providerDashboard();
        console.log("Data==>", data.data);
        setSalesData(data.data.salesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    if (token) {
      completeData();
    }
  }, [navigate, token]);

  const handleFilterChange = async (e) => {
    const selectedOption = e.target.value;
    setFilterOption(selectedOption);
    console.log("Filter", selectedOption);
    try {
      const response = await getSaleAnalysisProvider(selectedOption);
      console.log(response);

      setSalesData(response.data);
    } catch (error) {
      console.error("Error fetching sale analysis:", error);
    }
  };

  if (!token) return <Navigate to="/provider" />;

  return (
    <div className="container p-2 mx-auto mt-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div className="flex flex-col justify-center items-center bg-gray-200 p-4 rounded-lg">
      <FaDollarSign className="text-4xl text-blue-500 mb-2" />
      <div className="text-lg font-semibold">Total Income</div>
      <div className="text-xl">{salesData.totalSales}</div>
    </div>
    <div className="flex flex-col justify-center items-center bg-gray-200 p-4 rounded-lg">
      <FaCalendarCheck className="text-4xl text-green-500 mb-2" />
      <div className="text-lg font-semibold">Total Bookings</div>
      <div className="text-xl">{salesData.orderNo}</div>
    </div>
    <div className="flex flex-col justify-center items-center bg-gray-200 p-4 rounded-lg">
      <FaCalendarTimes className="text-4xl text-red-500 mb-2" />
      <div className="text-lg font-semibold">Total Cancelled</div>
      <div className="text-xl">{salesData.cancelledOrders}</div>
    </div>
  </div>

  <div className="flex justify-end mb-4 mt-8 mr-9 sm:mr-0">
    <select
      value={filterOption}
      onChange={handleFilterChange}
      className="p-2 border rounded-md"
    >
      <option>Select Period</option>
      <option value="daily">Daily</option>
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </select>
  </div>
  <div className="mt-8">
    <ChartComponent data={salesData} />
  </div>
</div>
  );
};

export default Dashboard;
