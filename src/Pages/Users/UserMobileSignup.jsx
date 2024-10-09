import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router";
import imageUrl from "../../assets/3d-render-secure-login-password-illustration_107791-16640.avif";
import { FaMobileAlt } from "react-icons/fa";

const UserMobileSignup = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL_ROUTE;
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [resendTimer, setResendTimer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(60);

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
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/reqloginotp`, {
        mobile,
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("OTP sent to registered mobile number");
        setShowOtpInput(true);

        const timer = setInterval(() => {
          setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);
        setResendTimer(timer);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("No user found.");
    }
  };

  const handleOtpChange = (event) => {
    const inputValue = event.target.value;
    setOtp(inputValue);
    setOtpError("");
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post(`${baseUrl}/reqloginotp`, {
        mobile,
      });
      if (response.status === 200) {
        toast.success("OTP resent to registered mobile number");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to resend OTP.");
    }
  };

  const handleConfirmOtp = async () => {
    if (otp.trim() === "") {
      setOtpError("Please enter the OTP.");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/confirmotp`, {
        mobile,
        otp,
      });
      if (response.status === 200) {
        toast.success("OTP confirmed successfully");
        navigate("/signup", { state: { phoneNumber: mobile } });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError(error.response.data.msg);
      setTimeout(() => {
        setOtpError("");
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(resendTimer);
    };
  }, [resendTimer]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-800 flex justify-center items-center px-4 py-12">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-6xl w-full lg:grid lg:grid-cols-2 lg:max-h-[700px]">
        <div className="relative lg:max-h-[700px]">
          <img
            src={imageUrl}
            alt="Background Image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center px-4">
              Welcome to Our Community
            </h1>
          </div>
        </div>
        <div className="p-8 md:p-12 lg:p-16 lg:max-h-[700px] lg:overflow-y-auto flex flex-col justify-center">
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="Logo" className="h-10 md:h-14 mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-600">
              Join Our Community
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8 mt-4">
            <div className="space-y-4">
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-bold mb-1"
              >
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaMobileAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="mobile"
                  value={mobile}
                  onChange={handleMobileChange}
                  maxLength={10}
                  className={`w-full py-3 pl-10 pr-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
                    mobile.trim() === ""
                      ? "border-gray-300"
                      : phoneNumberError
                      ? "border-red-500"
                      : "border-green-500"
                  }`}
                  placeholder="Enter your mobile number"
                />
              </div>

              {phoneNumberError && (
                <p className="text-red-500 text-lg mt-4 bg-red-100 px-4 py-2 rounded-md">
                  {phoneNumberError}
                </p>
              )}
            </div>

            {!showOtpInput && (
              <button
                type="submit"
                className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
                  mobile.trim() === "" || phoneNumberError
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                disabled={mobile.trim() === "" || phoneNumberError}
              >
                Request OTP
              </button>
            )}

            {showOtpInput && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-gray-700 font-bold mb-1"
                  >
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={handleOtpChange}
                    className={`w-full py-3 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
                      otp.trim() === ""
                        ? "border-gray-300"
                        : otpError
                        ? "border-red-500"
                        : "border-green-500"
                    }`}
                    placeholder="Enter OTP"
                  />

                  {otpError && (
                    <p className="text-red-500 text-lg mt-4 bg-red-100 px-4 py-2 rounded-md">
                      {otpError}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={remainingTime > 0}
                    className={`text-indigo-600 text-sm hover:underline focus:outline-none ${
                      remainingTime > 0 ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    {remainingTime > 0
                      ? `Resend OTP in ${remainingTime} seconds`
                      : "Resend OTP"}
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmOtp}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
                  >
                    Confirm OTP
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserMobileSignup;
