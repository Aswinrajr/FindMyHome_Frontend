import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import logo from "../../assets/Screenshot_2024-01-12_004511-removebg-preview (1).png";
import axios from "axios";
import { useNavigate } from "react-router";

const AdminForgotPassword = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const adminRoute = import.meta.env.VITE_ADMIN_ROUTE;

  const isValidMobile = (value) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidMobile(mobile)) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await axios.post(`${adminRoute}/reqotp`, {
        mobile,
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("OTP send to registered mobile number");
        setTimeout(() => {
          navigate("/admin/verifyotp");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col md:flex-row rounded-lg shadow-md w-full md:w-4/5 lg:w-3/4 xl:w-2/3 bg-white">
        <div className="md:w-1/2 bg-fuchsia-700 flex items-center justify-center rounded-t-lg">
          <img
            src={logo}
            alt="Logo"
            className="w-auto h-auto max-h-full object-contain"
          />
        </div>
        <div className="md:w-1/2 p-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-4 text-center text-blue-900">
            Forgot Password !
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-bold text-sm mb-2"
              >
                Enter Your Mobile Number
              </label>
              <input
                type="text"
                id="mobile"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  setErrorMessage("");
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your mobile number"
                required
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-orange-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Request for OTP
            </button>
          </form>
          <h1 onClick={() => navigate("/admin/verifyotp")}>next</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
