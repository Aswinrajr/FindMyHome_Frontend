import { useState } from "react";

import logo from "../../assets/Screenshot_2024-01-12_004511-removebg-preview (1).png";
import axios from "axios";
import { useNavigate } from "react-router";
import { Toaster, toast } from "react-hot-toast";

const ProviderForgotPassword = () => {
  const providerRoute = import.meta.env.VITE_PROVIDER_ROUTE;
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  function validNumber(number) {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(number);
  }
  const handleMobileChange = (event) => {
    const inputValue = event.target.value;
    setMobile(inputValue);
    setPhoneNumberError("");
    if (inputValue.trim() === "") {
      setPhoneNumberError("Please enter a valid mobile number.");
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
      const response = await axios.post(`${providerRoute}/reqotp`, {
        mobile,
      });

      if (response.status === 200) {
        toast.success("OTP sent to registered mobile number");
        setTimeout(() => {
          navigate("/provider/verifyotp", {
            state: { otp: response.data.OTP },
          });
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
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
                onChange={handleMobileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your mobile number"
              />
              {phoneNumberError && (
                <p className="text-red-500 text-lg mt-2">{phoneNumberError}</p>
              )}
            </div>

            <button
              type="submit"
              className={`bg-orange-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                mobile.trim() === "" || phoneNumberError
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={mobile.trim() === "" || phoneNumberError}
            >
              Request for OTP
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ProviderForgotPassword;
