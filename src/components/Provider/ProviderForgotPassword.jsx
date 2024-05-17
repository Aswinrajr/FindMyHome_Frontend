import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import companyLogo from "../../assets/logo.png";
import forgotPasswordImage from "../../assets/secure-data-concept-illustration_114360-343.avif";
import { FaMobileAlt } from "react-icons/fa";

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
    console.log("Haii");

    if (
      !mobile ||
      mobile.trim() === "" ||
      mobile.length !== 10 ||
      !validNumber(mobile)
    ) {
      setPhoneNumberError("Please enter a valid mobile number.");
      setTimeout(() => {
        setPhoneNumberError("");
      }, 1500);
      return;
    }

    try {
      const response = await axios.post(`${providerRoute}/reqotp`, { mobile });

      if (response.status === 200) {
        toast.success("OTP sent to registered mobile number");
        setTimeout(() => {
          navigate("/provider/verifyotp", { state: { mobile: mobile } });
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen "
      style={{
        backgroundImage: "linear-gradient(to bottom, #141e30, #243b55)",
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <img
              src={forgotPasswordImage}
              alt="Forgot Password"
              className="h-auto w-full max-w-sm"
            />
          </div>
          <div className="flex flex-col justify-center p-1 ">
            <div className="flex justify-center mb-6">
              <img
                src={companyLogo}
                alt="Company Logo"
                className="h-12 w-auto"
              />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center  text-gray-700">
              Forgot Password
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="mobile"
                  className="block font-semibold mb-2 text-gray-700"
                >
                  Enter Your Mobile Number
                </label>
                <div className="relative">
                  <FaMobileAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="mobile"
                    value={mobile}
                    onChange={handleMobileChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your mobile number"
                    maxLength={10}
                  />
                </div>
                {phoneNumberError && (
                  <p className="text-red-500 mt-1">{phoneNumberError}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 w-full"
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

export default ProviderForgotPassword;
