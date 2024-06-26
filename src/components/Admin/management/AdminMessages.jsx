import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";

const AdminMessages = () => {
  let token = localStorage.getItem("accessToken")
  const adminUrl = import.meta.env.VITE_ADMIN_ROUTE;

  const newToken =JSON.parse(token)
  const navigate = useNavigate();
  token = newToken?.accessToken
  const [userData, setUserData] = useState([]);              


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${adminUrl}/confirmuser`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
   
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);
  if(!token) return <Navigate to="/admin"/>
  

  const handleConfirm = async (action, email) => {
    try {
      const data = { action, email };
      const response = await axios.post(`${adminUrl}/action`, data,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
      const newUserdata = userData.filter((data)=>data.userEmail!==email)
    
      toast.success(`User role ${action} successfully`);
      setUserData(newUserdata)
      setTimeout(() => {
        navigate("/admin/messages");
      }, 1000);
    } catch (error) {
      console.error("Error in handleConfirm:", error.message);
      toast.error("Some thong went wrong!!");
    }
  };
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
    <Toaster position="top-center" reverseOrder={false}></Toaster>
    {userData.map((user, index) => (
      <div
        key={index}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4"
      >
        <div className="flex-grow">
          <p className="text-lg font-semibold">
            {user.userName} is requested to become a Rentify.
          </p>
        </div>
        <div className="flex mt-4 sm:mt-0 sm:ml-4">
          <button
            onClick={() => handleConfirm("accept", user.userEmail)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Accept
          </button>
          <button
            onClick={() => handleConfirm("reject", user.userEmail)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
