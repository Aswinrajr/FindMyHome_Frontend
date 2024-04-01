import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import images from "../../assets/profile_demo.avif";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const AdminProfile = () => {
  const navigate = useNavigate()
  const adminUrl = import.meta.env.VITE_ADMIN_ROUTE;
  const baseUrl = import.meta.env.VITE_BASE_URL_ROUTE;
  const admin = localStorage.getItem("admin");
  const [adminData, setAdminData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(`${adminUrl}/adminprofile`, { admin });
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
      toast.error("Please enter both new and confirm passwords.");
      setIsEditing(true);
      return;
    }

    const data = {
      newPassword,
      confirmPassword,
      admin,
    };

    try {
      const response = await axios.post(`${adminUrl}/changepassword`, data);
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("adminId", adminData.adminId);

    try {
      const response = await axios.post(`${adminUrl}/uploadimage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      
      toast.success("Image uploaded successfully!");
      setTimeout(() => {
        navigate("/admin/profile")
        
      }, 1000);
    
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image. Please try again later.");
    }
  };
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
                src={
                  previewImage
                    ? previewImage
                    : adminData.image
                    ? `${baseUrl}/${adminData.image}`
                    : images
                }
                alt="image"
                className="w-60 h-56 object-contain rounded-lg"
              />
              <input
                type="file"
                className="mt-3 mb-4 border-rad"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button
                className="rounded-md bg-blue-500 text-white px-4 py-2 mr-2 focus:outline-none"
                onClick={handleImageUpload}
              >
                Upload Image
              </button>
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
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
