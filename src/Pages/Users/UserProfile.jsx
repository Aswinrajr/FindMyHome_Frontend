import { useEffect, useState } from "react";
import { FaChartLine, FaKey, FaUserEdit, FaBell, FaCalendarAlt, FaBed,FaWallet  } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import TopBar from "../../components/Sample/TopBar";
import Footer from "../../components/Sample/Footer";
import profileImage from "../../assets/profile_demo.avif";
import { Navigate, useNavigate } from "react-router";
import { getUserData } from "../../service/User/UserService";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const facilitiesData = [
  { icon: FaChartLine, text: "Dashboard",path:"Dashboard" },
  { icon: FaKey, text: "Change Password",path:"Change_Password" },
  { icon: FaUserEdit, text: "Edit Profile",path:"Edit_Profile" },
  { icon: FaBell, text: "Notification",path:"Notification" },
  { icon: FaCalendarAlt, text: "Bookings",path:"Bookings" },
  { icon: FaBed, text: "Room",path:"Room" },
  { icon: FaWallet, text: "Wallet",path:"wallet" }
];

const UserProfile = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL_ROUTE;
  const user = localStorage.getItem("userAccessToken");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    userMobile: "",
    image: "",
    status: "",
    role: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData();
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleNavigate = (path) => {
    path = path.toLowerCase();
    if (userData.role !== "PG" || userData.role === "Render") {
      if (path === "dashboard" || path === "room") {
        toast.error("User is not registered as a Rentifier!!");
        return;
      }
    }
    navigate(`/${path}`);
  };
  if (!user) return <Navigate to="/" />;

  return (
    <>
      <TopBar />
      <div className="container mx-auto mt-6 px-4 mb-6">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="bg-white shadow-md rounded-lg overflow-hidden relative">
          <div className="p-4 bg-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">User Details</h2>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <ClipLoader color={"#123abc"} loading={loading} css={override} size={50} />
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center mb-6 relative">
                <div className="w-auto h-72 relative ">
                  <img
                    src={userData?.image ? `${baseUrl}/${userData.image}` : profileImage}
                    alt="image"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div
                    className={`absolute bottom-0 right-0 mb-2 mr-2 rounded-full bg-${
                      userData.status === "Active" ? "green" : "red"
                    }-500 w-20 h-8 flex items-center justify-center text-white`}
                  >
                    {userData?.status === "Active" ? "Active" : "Blocked"}
                  </div>
                </div>
                <div className="flex flex-col ml-40">
                  <h3 className="text-5xl font-bold text-gray-800">{userData?.userName}</h3>
                  <p className="text-gray-600 text-2xl font-bold mb-2">{userData?.userEmail}</p>
                  <p className="text-gray-600 text-2xl font-bold mb-2">{userData?.userMobile}</p>
                </div>
              </div>
              <div className="border-t border-gray-300 pt-4 mb-6">
                <div className="grid grid-cols-3 gap-4">
                  {facilitiesData?.map((facility, index) => (
                    <div
                      key={index}
                      onClick={() => handleNavigate(`${facility.path}`)}
                      className="flex items-center bg-gray-100 rounded-lg p-2 cursor-pointer hover:bg-gray-300"
                    >
                      <facility.icon className="text-blue-500 mr-2" />
                      <span className="text-lg text-gray-800">{facility.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer className="mt-6" />
    </>
  );
};

export default UserProfile;
