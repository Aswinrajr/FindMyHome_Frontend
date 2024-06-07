import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import {
  FaDollarSign,
  FaCalendarCheck,
  FaCalendarTimes,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import {
  fetchOverallSalesData,
  getAdminSaleAnalysis,
} from "../../../service/Admin/ManagementService";
import AdminChart from "./AdminChart";

const AdminDashboard = () => {
  const [salesData, setSalesData] = useState({});
  const [filterOption, setFilterOption] = useState("Total");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOverallSalesData();
      console.log("Data==>", data.data.salesData);
      setSalesData(data.data.salesData);
    };
    fetchData();
  }, []);

  const handleFilterChange = async (e) => {
    const selectedOption = e.target.value;
    setFilterOption(selectedOption);
    console.log("filter", selectedOption);

    try {
      const response = await getAdminSaleAnalysis(selectedOption);
      console.log(response);
      setSalesData({ ...salesData, ...response.data });
    } catch (error) {
      console.error("Error fetching sale analysis:", error);
    }
  };

  if (!token) return <Navigate to="/admin" />;

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-end mb-4">
        <select
          value={filterOption}
          onChange={handleFilterChange}
          className="p-2 border rounded-md"
        >
          <option value="">Select Option</option>
          <option value="daily">Day</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col justify-center items-center bg-gray-200 p-4 rounded-lg">
          <FaDollarSign className="text-4xl text-blue-500 mb-2" />
          <div className="text-lg font-semibold">Total Income</div>
          <div className="text-xl">{salesData?.totalSales}</div>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-200 p-4 rounded-lg">
          <FaCalendarCheck className="text-4xl text-green-500 mb-2" />
          <div className="text-lg font-semibold">Total Bookings</div>
          <div className="text-xl">{salesData?.orderNo}</div>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-200 p-4 rounded-lg">
          <FaCalendarTimes className="text-4xl text-red-500 mb-2" />
          <div className="text-lg font-semibold">Total Cancelled</div>
          <div className="text-xl">{salesData?.cancelledOrders}</div>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-200 p-4 rounded-lg">
          <FaCalendarCheck className="text-4xl text-green-500 mb-2" />
          <div className="text-lg font-semibold">Total Confirmed</div>
          <div className="text-xl">{salesData?.totalBooked}</div>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-200 p-4 rounded-lg">
          <FaUsers className="text-4xl text-blue-500 mb-2" />
          <div className="text-lg font-semibold">Number of Users</div>
          <div className="text-xl">{salesData?.userNo}</div>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-200 p-4 rounded-lg">
          <FaUserTie className="text-4xl text-blue-500 mb-2" />
          <div className="text-lg font-semibold">Number of Providers</div>
          <div className="text-xl">{salesData?.providerNo}</div>
        </div>
        <AdminChart data={salesData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
