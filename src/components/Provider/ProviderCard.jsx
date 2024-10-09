import { FaLock, FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster, toast } from "react-hot-toast";

import { useNavigate } from "react-router";

import {
  changePassword,
  getProviderCard,
} from "../../service/Provider/LoginService";

const ProviderCard = () => {
  let token = localStorage.getItem("providerAccessToken");

  const newToken = JSON.parse(token);
  token = newToken?.providerAccessToken;

  const navigate = useNavigate();

  const [provider, setProvider] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProviderCard();
    

      if (response.status === 200) {
        setProvider(response.data.providerData);
      
      }
    };
    fetchData();
  }, []);
  function handleEditProfile() {
    setIsEditing(true);
  }

  const handleSavePassword = async () => {
    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      toast.error("Please enter both new and confirm passwords.");
      setIsEditing(true);
      return;
    }

    const data = {
      newPassword,
      confirmPassword,
    };

    try {
      const response = await changePassword(data);
      

      if (response.status === 200) {
        toast.success(response.data.message);
        setIsEditing(false);
      }else{
        toast.error(response.response.data.message);

      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.response.response.data.message);
    }
  };

  return (
<div className="container mx-auto mt-6 px-4 mb-6">
  <Toaster position="top-center" reverseOrder={false} />
  <div className="bg-white shadow-md rounded-lg overflow-hidden relative md:flex">
   
    <div className="p-6 flex-1">
      <div className="flex flex-col md:flex-row items-center mb-6 relative">
        <div className="mb-4 md:mb-0 md:mr-6">
          {provider.providerImage && provider.providerImage.length > 0 ? (
            <img
              src={provider.providerImage[0]}
              alt=""
              className="w-48 h-48 rounded-lg object-cover"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h3 className="text-3xl md:text-5xl font-bold text-gray-800">
            {provider.providerName}
          </h3>
          <p className="text-gray-600 text-lg md:text-2xl font-bold mb-2">
            {provider.providerEmail}
          </p>
          <p className="text-gray-600 text-lg md:text-2xl font-bold mb-2">
            {provider.providerMobile}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start mt-2 mb-4 md:flex-row md:items-center">
        {isEditing ? (
          <div className="flex flex-col w-full md:flex-row md:w-auto mb-4 md:mb-0">
            <input
              type="password"
              placeholder="New Password"
              className="rounded-md border border-gray-400 px-3 py-2 mb-2 md:mb-0 md:mr-2 focus:outline-none w-full md:w-auto"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="rounded-md border border-gray-400 px-3 py-2 mb-2 md:mb-0 md:mr-2 focus:outline-none w-full md:w-auto"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="rounded-md bg-green-500 text-white px-4 py-2 mb-2 md:mb-0 md:mr-2 focus:outline-none hover:bg-green-600 transition duration-200 w-full md:w-auto"
              onClick={handleSavePassword}
            >
              Save
            </button>
            <button
              className="rounded-md bg-gray-500 text-white px-4 py-2 focus:outline-none hover:bg-gray-600 transition duration-200 w-full md:w-auto"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="rounded-md bg-purple-500 text-white px-4 py-2 mr-2 mb-4 md:mb-0 focus:outline-none hover:bg-purple-600 transition duration-200 flex items-center w-full md:w-auto"
            onClick={handleEditProfile}
          >
            <FaLock className="mr-2" />
            Change Password
          </button>
        )}
      </div>
      <button
        className="rounded-md bg-pink-800 text-white px-4 py-2 focus:outline-none hover:bg-pink-700 transition duration-200 flex items-center w-full md:w-auto"
        onClick={() => navigate("/provider/profileedit")}
      >
        <FaEdit className="mr-2" />
        Edit Profile
      </button>
    </div>
  </div>
</div>
  );
};

export default ProviderCard;
