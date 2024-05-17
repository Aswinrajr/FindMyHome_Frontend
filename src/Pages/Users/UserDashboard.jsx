import { useEffect, useState } from "react";
import { FaCalendarCheck, FaCalendarTimes, FaDollarSign } from "react-icons/fa";
import TopBar from "../../components/Sample/TopBar";
import Footer from "../../components/Sample/Footer";
import { getUsersDashboard } from "../../service/User/UserService";

const UserDashboard = () => {
  const [userData, setUserData] = useState({});

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

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />

      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">

          <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md">
            <FaDollarSign className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
            <p className="text-xl font-bold">₹{userData?.totalBookingAmount}</p>
          </div>

          <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md">
            <FaCalendarCheck className="text-4xl text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
            <p className="text-xl font-bold">{userData?.totalBooking}</p>
          </div>

        </div>
      </main>

      <Footer className="mt-auto" />
    </div>
  );
};

export default UserDashboard;
