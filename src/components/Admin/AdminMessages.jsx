import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";

const AdminMessages = () => {
  const adminUrl = import.meta.env.VITE_ADMIN_ROUTE;
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${adminUrl}/confirmuser`);
        console.log(response.data.data);
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const admin = localStorage.getItem("admin");
  if (!admin) return <Navigate to="/admin" />;

  const handleConfirm = async (action, email) => {
    try {
      const data = { action, email };
      const response = await axios.post(`${adminUrl}/action`, data);
      console.log(response.data);
      const newUserdata = userData.filter((data) => data.userEmail !== email);
      console.log("newUserdata", newUserdata);
      toast.success(`User role ${action} successfully`);
      setUserData(newUserdata);
      setTimeout(() => {
        navigate("/admin/messages");
      }, 1000);
    } catch (error) {
      console.error("Error in handleConfirm:", error.message);
      toast.error("Some thong went wrong!!");
    }
  };
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      {userData.map((user, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4"
        >
          <div className="flex-grow">
            <p className="text-lg font-semibold">
              {user.userName} is requested to become a Rentify.
            </p>
          </div>
          <div className="ml-4">
            <button
              onClick={() => handleConfirm("accept", user.userEmail)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Accept
            </button>
            <button
              onClick={() => handleConfirm("reject", user.userEmail)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMessages;
