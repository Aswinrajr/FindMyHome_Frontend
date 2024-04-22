import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";

import { Toaster, toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
import { axiosInstance } from "../../../api/axios";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const AdminProfile = () => {
  const navigate = useNavigate();

  let token = localStorage.getItem("accessToken");
  console.log("In users list", token);
  const newToken = JSON.parse(token);
  token = newToken?.accessToken;

  const [adminData, setAdminData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.post(`/admin/adminprofile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        setAdminData(response.data);
      }
    };
    fetchData();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSavePassword = async () => {
    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      setError("Please enter both new and confirm passwords.");
      setIsEditing(true);
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }

    if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(newPassword) ||
      newPassword.length < 6
    ) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one symbol, one number, and be at least 6 characters long."
      );
      setIsEditing(true);
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setIsEditing(true);
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }

    const data = {
      newPassword,
      confirmPassword,
    };

    try {
      const response = await axiosInstance.post(`/admin/changepassword`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsEditing(false);
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleUploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "image_preset");
    try {
      console.log("Haii");
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      console.log(cloudName);
      const resourceType = "image";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      console.log(api);

      const res = await axios.post(api, data);
      console.log("Res.data in upload cloudinary", res);
      const { secure_url } = res.data;

      console.log("Secure_url: ", secure_url);
      setImageSelected(true);
      return secure_url;
    } catch (err) {
      console.log("Error in image upload", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("=======>", file);
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
    setImageSelected(true);
  };

  const handleImageUpload = async () => {
    try {
      const imageUrl = await handleUploadImage();

      console.log(imageUrl);

      const data = {
        imageUrl,
      };

      const response = await axiosInstance.post(`/admin/uploadimage`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setLoading(false);

      toast.success("Image uploaded successfully!");
      setTimeout(() => {
        navigate("/admin/profile");
      }, 1000);
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image. Please try again later.");
    }
  };

  if (!token) return <Navigate to="/admin" />;
  return (
    <div className="container mx-auto mt-6 px-4 mb-6">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white shadow-md rounded-lg overflow-hidden relative">
        <div className="p-4 bg-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            Admin Profile
          </h2>
        </div>
        <div className="p-6">
          <div className="flex items-center  mb-6 relative">
            <div className="w-auto h-72 relative ">
              <img
                src={previewImage ? previewImage : `${adminData.image}`}
                alt="image"
                className="w-60 h-56 object-contain rounded-lg"
              />
              <input
                type="file"
                className="mt-3 mb-4 border-rad"
                accept="image/*"
                id="img"
                onChange={handleImageChange}
              />
              {imageSelected ? (
                <button
                  className="rounded-md bg-blue-500 text-white px-4 py-2 mr-2 focus:outline-none"
                  onClick={handleImageUpload}
                >
                  Upload Image
                </button>
              ) : (
                <button
                  className="rounded-md bg-info-500 text-white px-4 py-2 mr-2 focus:outline-none "
                  disabled
                >
                  Upload Image
                </button>
              )}

              {loading && <BeatLoader color="#36d7b7" />}
            </div>
            <div className="flex flex-col ml-40">
              <h3 className="text-5xl font-bold text-gray-800">
                {adminData.adminName}
              </h3>
              <p className="text-gray-600 text-2xl font-bold mb-2">
                {adminData.adminEmail}
              </p>
              <p className="text-gray-600 text-2xl font-bold mb-2">
                {adminData.adminMobile}
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
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
