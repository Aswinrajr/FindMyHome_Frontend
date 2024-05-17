import { useState } from "react";
import TopBar from "../../components/Sample/TopBar";
import Footer from "../../components/Sample/Footer";

import { toast, Toaster } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
import { changeUserPassword } from "../../service/User/UserService";

const UserChangePassword = () => {
  const user = localStorage.getItem("userAccessToken");
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    console.log(data);

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    try {
      if (newPassword !== confirmPassword) {
        setError("New password and confirm password must match");
        setTimeout(() => {
          setError("")
        }, 1000);
        return;
      }

      // console.log("Old Password:", oldPassword);
      // console.log("New Password:", newPassword);
      // console.log("Confirm Password:", confirmPassword);

      const response = await changeUserPassword(data);

      // axios.put(`${baseRoute}/changepassword`, data);

      console.log("Respomse in change password", response);
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/userprofile");
        }, 1000);
      }
      if (
        response.response.status === 400 ||
        response.response.status === 401 ||
        response.response.status === 404 ||
        response.response.status === 500
      ) {
        console.log(response.response.status);
        toast.error(response.response.data.message);
      }
    } catch (err) {
      console.log("Error in change password==>", err);
      toast.error(err.response.data.message);
    }
  };
  if (!user) return <Navigate to="/" />;

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <div className="flex-grow flex justify-center items-center">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">
              Change Password
            </h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mt-6">
                <label
                  htmlFor="oldpassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Old Password
                </label>
                <input
                  id="oldpassword"
                  name="oldpassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="newpassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  id="newpassword"
                  name="newpassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="confirmpassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              {error && <p className="text-red-500">{error}</p>}
            </form>
            <div className="flex justify-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 mt-6 w-full"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default UserChangePassword;
