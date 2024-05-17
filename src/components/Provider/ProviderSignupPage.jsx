import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Toaster, toast } from "react-hot-toast";
import backgroundImage from "../../assets/queen-937501_1280.jpg";

const ProviderSignUp = () => {
  const location = useLocation();
  const { phoneNumber } = location.state ? location.state : "";
  const providerRoute = import.meta.env.VITE_PROVIDER_ROUTE;
  const navigate = useNavigate();
  const [residenceName, setResidenceName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [residenceNameError, setResidenceNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      clearErrors();
    }, 2000);
    return () => clearTimeout(errorTimeout);
  }, []);

  if (!phoneNumber) {
    toast.error("Please enter a valid mobile number");
    setTimeout(() => {
      navigate("/provider/register");
    }, 1000);
    return;
  }
  const clearErrors = () => {
    setResidenceNameError("");
    setEmailError("");
    setPasswordError("");
  };

  const validatePassword = () => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(
      password
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearErrors();
    if (
      !residenceName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setResidenceNameError("Please enter your residence name.");
      setEmailError("Please enter your email.");
      setPasswordError("Please enter your password.");

      setTimeout(() => {
        clearErrors();
      }, 2000);
    }

    if (!residenceName.trim()) {
      setResidenceNameError("Please enter your residence name.");
      return;
    }

    if (residenceName.includes(" ")) {
      setResidenceNameError("Residence name cannot contain spaces.");
      return;
    }

    if (!email.trim()) {
      setEmailError("Please enter your email.");
      return;
    }

    if (email.includes(" ")) {
      setEmailError("Email cannot contain spaces.");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password.");
      return;
    }

    if (!confirmPassword.trim()) {
      setPasswordError(
        "Password must have an uppercase, lowercase, symbol, and numbers."
      );
      return;
    }

    if (!validatePassword()) {
      setPasswordError(
        "Password must have an uppercase, lowercase, symbol, and numbers."
      );
      return;
    }

    try {
      const response = await axios.post(`${providerRoute}/signup`, {
        residenceName,
        email,
        mobile: phoneNumber,
        password,
        confirmPassword,
      });

      if (response.status === 201) {
        toast.success("Sign up Successful");
        setTimeout(() => {
          navigate("/provider");
        }, 2000);
      } else {
        console.error("Sign up failed");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setTimeout(() => {
        navigate("/provider");
      }, 2000);
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <img src={logo} alt="Logo" className="mx-auto h-12" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome Back Provider Signup
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="residenceName"
              className="block text-gray-700 font-semibold text-sm mb-2"
            >
              Residence Name
            </label>
            <input
              type="text"
              id="residenceName"
              value={residenceName}
              onChange={(e) => setResidenceName(e.target.value)}
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your residence name"
            />
            {residenceNameError && (
              <p className="text-red-500 text-sm mt-1">{residenceNameError}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold text-sm mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold text-sm mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-semibold text-sm mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm your password"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white font-semibold rounded-md transition-colors duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <a
            onClick={() => navigate("/provider")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ProviderSignUp;
