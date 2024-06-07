import { useEffect, useState } from "react";
import { FaCalendarCheck, FaTimes, FaDollarSign } from "react-icons/fa";
import TopBar from "../../components/Sample/TopBar";
import Footer from "../../components/Sample/Footer";
import {
  getSaleAnalysis,
  getUsersDashboard,
} from "../../service/User/UserService";
import UserDashboardChart from "./UserDashboardChart";

const UserDashboard = () => {
  const [userData, setUserData] = useState({});

  const [filterOption, setFilterOption] = useState("Total");
  console.log(filterOption);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const newData = await getUsersDashboard();
        setUserData(newData.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleFilterChange = async (e) => {
    const selectedOption = e.target.value;
    setFilterOption(selectedOption);
    console.log("filter", selectedOption);

    try {
      const response = await getSaleAnalysis(selectedOption);
      console.log(response);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching sale analysis:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />

      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md">
            <FaDollarSign className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
            <p className="text-xl font-bold">
              ₹{userData?.totalBookingAmount || 0}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md">
            <FaCalendarCheck className="text-4xl text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
            <p className="text-xl font-bold">{userData?.totalBooking || 0}</p>
          </div>

          <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md">
            <FaTimes className="text-4xl text-red-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Cancel Bookings</h3>
            <p className="text-xl font-bold">
              {userData?.totalCancelledBookings || 0}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <UserDashboardChart data={userData} />
        </div>
      </main>

      <Footer className="mt-auto" />
    </div>
  );
};

export default UserDashboard;
