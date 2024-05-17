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
      console.log("Provider===>", response);

      if (response.status === 200) {
        setProvider(response.data.providerData);
        console.log("Provider", provider);
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
      console.log("Password change",response)

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
      <div className="bg-white shadow-md rounded-lg overflow-hidden relative">
        <div className="p-4 bg-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            Provider Profile
          </h2>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-6 relative">
            {provider.providerImage && provider.providerImage.length > 0 ? (
              <img src={provider.providerImage[0]} alt="" />
            ) : (
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-400">No Image</span>
              </div>
            )}

            <div className="flex flex-col ml-40">
              <h3 className="text-5xl font-bold text-gray-800">
                {provider.providerName}
              </h3>
              <p className="text-gray-600 text-2xl font-bold mb-2">
                {provider.providerEmail}
              </p>
              <p className="text-gray-600 text-2xl font-bold mb-2">
                {provider.providerMobile}
              </p>
            </div>
          </div>

          <div className="flex items-center mt-2 mb-4">
            {isEditing ? (
              <div className="flex items-center">
                <input
                  type="password"
                  placeholder="New Password"
                  className="rounded-md border border-gray-400 px-3 py-2 mr-2 focus:outline-none"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="rounded-md border border-gray-400 px-3 py-2 mr-2 focus:outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  className="rounded-md bg-green-500 text-white px-4 py-2 mr-2 focus:outline-none"
                  onClick={handleSavePassword}
                >
                  Save
                </button>
                <button
                  className="rounded-md bg-gray-500 text-white px-4 py-2 focus:outline-none"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="rounded-md bg-purple-500 text-white px-4 py-2 mr-2 focus:outline-none"
                onClick={handleEditProfile}
              >
                <FaLock className="mr-2" />
                Change Password
              </button>
            )}
          </div>
          <button
            className="rounded-md bg-pink-800 text-white px-4 py-2 mr-2 focus:outline-none"
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
