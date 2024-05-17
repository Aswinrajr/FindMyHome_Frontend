import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  FaDollarSign,
  FaCalendarCheck,
  FaCalendarTimes,
  // FaChartLine,
} from "react-icons/fa";

import {
  completeDatas,
  providerDashboard,
} from "../../service/Provider/LoginService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [salesData, setSalesData] = useState({});

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
      const data = await providerDashboard();
      console.log("Data==>", data.data.salesData);
      setSalesData(data.data.salesData);
    };

    fetchData();

    if (token) {
      completeData();
    }
  }, [navigate, token]);

  if (!token) return <Navigate to="/provider" />;

  return (
    <div className="container p-2 mx-auto mt-10">
      {/* <button
        onClick={() => navigate("/admin/sales")}
        className="absolute top-20  right-8 flex items-center px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        <FaChartLine className="mr-2" />
        Sales Analytics
      </button> */}
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
      </div>
    </div>
  );
};

export default Dashboard;
