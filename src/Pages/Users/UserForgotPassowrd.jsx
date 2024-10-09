import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import companyLogo from "../../assets/logo.png";
import forgotPasswordImage from "../../assets/3d-render-secure-login-password-illustration_107791-16640.avif";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaMobileAlt } from "react-icons/fa";

const UserForgotPassword = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL_ROUTE;
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  console.log(mobile);

  function validNumber(number) {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(number);
  }

  const handleMobileChange = (event) => {
    const inputValue = event.target.value;
    setMobile(inputValue);

    setPhoneNumberError("");
    if (inputValue.trim() === "") {
      setPhoneNumberError("Please enter a mobile number.");
    } else if (inputValue.length !== 10) {
      setPhoneNumberError(`Mobile number must have 10 digits.`);
    } else if (!validNumber(inputValue)) {
      setPhoneNumberError("Number must be a valid mobile.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mobile.trim() === "" || mobile.length !== 10 || !validNumber(mobile)) {
      setPhoneNumberError("Please enter a valid mobile number.");

      setTimeout(() => {
        setPhoneNumberError();
      }, 1000);
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/reqotp`, {
        mobile,
      });
      if (response.status === 200) {
        toast.success("OTP sent to registered mobile number");
        setTimeout(() => {
          navigate("/verifyotp", { state: { mobile } });
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("No user found.");
    }
  };

  return (
    <div
    className="flex items-center justify-center min-h-screen"
    style={{ backgroundImage: "linear-gradient(to bottom, #141e30, #243b55)" }}
  >
    <Toaster position="top-center" reverseOrder={false} />
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-4 sm:mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center mb-6 lg:mb-0">
          <img
            src={forgotPasswordImage}
            alt="Forgot Password"
            className="h-auto w-full max-w-sm rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <div className="flex justify-center">
            <img
              src={companyLogo}
              alt="Company Logo"
              className="h-12 w-auto"
            />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-700">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="mobile"
                className="block font-semibold mb-2 text-gray-700"
              >
                Enter Your Mobile Number
              </label>
              <div className="relative">
                <FaMobileAlt className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="mobile"
                  value={mobile}
                  onChange={handleMobileChange}
                  className="shadow appearance-none border rounded-md w-full py-3 px-4 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your mobile number"
                  maxLength={10}
                />
              </div>
        
                {phoneNumberError && (
              <p className="text-red-500 text-lg mt-4 bg-red-100 px-4 py-2 rounded-md">
                {phoneNumberError}
              </p>
            )}
              
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-300 w-full"
            >
              Request for OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default UserForgotPassword;
