import logo from "../../assets/logo.png";
import otpImage from "../../assets/3d-mobile-phone-with-security-code-padlock_107791-16180.avif";
import axios from "axios";
import { useNavigate, Navigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userAuth";
import { useState, useEffect } from "react";

import { Toaster, toast } from "react-hot-toast";

const UserVerifyOtp = () => {
  const baseRoute = import.meta.env.VITE_BASE_URL_ROUTE;
  const location = useLocation();
  const { mobile } = location.state ? location.state : {};
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(60);
  console.log(mobile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = localStorage.getItem("userAccessToken");

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        setResendDisabled(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOtp = async () => {
    setResendDisabled(true);
    setTimer(30);
    console.log(mobile);

    try {
      const response = await axios.post(`${baseRoute}/reqotp`, {
        mobile,
      });
      console.log("==>", response);
      if (response.status === 200) {
        toast.success("OTP resent successfully");
      }
      if (response.status === 401) {
        console.log("in err");
        setErr(response.data.msg);
      }
    } catch (error) {
      console.error("Error:", error.response);

      toast.error("Failed to resend OTP.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (otp.length === 0) {
      setErr("OTP is required");
      setTimeout(() => {
        setErr("");
      }, 1000);
      return;
    }

    try {
      const response = await axios.post(`${baseRoute}/verifyotp`, {
        otp,
      });
      if (response.status === 200) {
        toast.success("OTP verified successfully");

        dispatch(setUser(response.data.token));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setErr(error.response.data.msg);

      setTimeout(() => {
        setErr("");
      }, 1500);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 6) {
      setOtp(value);
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#141e30] to-[#243b55]">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white rounded-lg shadow-lg p-4 mx-4 sm:mx-0 sm:max-w-md">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Company Logo" className="h-12 w-auto" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-700">
            Verify OTP
          </h2>
          <div className="flex items-center justify-center mb-4">
            <img
              src={otpImage}
              alt="OTP Verification"
              className="h-auto w-full max-w-sm"
            />
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="w-full">
              <label
                htmlFor="otp"
                className="block font-semibold mb-2 text-gray-700"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleInputChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter OTP"
                maxLength={6}
                inputMode="numeric"
              />
              {err && <p className="text-red-500 mt-1">{err}</p>}
            </div>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              >
                Verify OTP
              </button>
              <p
                onClick={handleResendOtp}
                disabled={resendDisabled}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded cursor-pointer w-full sm:w-auto"
              >
                Resend OTP {resendDisabled && `(${timer}s)`}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserVerifyOtp;