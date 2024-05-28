import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import {
  FaDollarSign,
  FaCalendarCheck,
  FaCalendarTimes,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import { fetchOverallSalesData } from "../../../service/Admin/ManagementService";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const SalesChart = ({ salesData }) => {
  const chartData = {
    labels: ["Total Sales", "Orders"],
    datasets: [
      {
        label: "Sales Data",
        data: [salesData.totalSales, salesData.orderNo],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

const AdminDashboard = () => {
  const [salesData, setSalesData] = useState({});
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOverallSalesData();
      console.log("Data==>", data.data.salesData);
      setSalesData(data.data.salesData);
    };
    fetchData();
  }, []);

  if (!token) return <Navigate to="/admin" />;

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-2 gap-4">
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
        <div className="flex flex-col justify-center items-center bg-gray-200 p-4 rounded-lg">
          <FaCalendarCheck className="text-4xl text-green-500 mb-2" />
          <div className="text-lg font-semibold">Total Confirmed</div>
          <div className="text-xl">{salesData.totalBooked}</div>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-200 p-4 rounded-lg">
          <FaUsers className="text-4xl text-blue-500 mb-2" />
          <div className="text-lg font-semibold">Number of Users</div>
          <div className="text-xl">{salesData.userNo}</div>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-200 p-4 rounded-lg">
          <FaUserTie className="text-4xl text-blue-500 mb-2" />
          <div className="text-lg font-semibold">Number of Providers</div>
          <div className="text-xl">{salesData.providerNo}</div>
        </div>
      </div>
      <div className="mt-8">
        <SalesChart salesData={salesData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
