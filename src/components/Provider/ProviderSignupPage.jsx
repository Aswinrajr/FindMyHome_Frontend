import { useEffect, useState } from "react";
import axios from "axios";
import {  useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Screenshot_2024-01-12_004511-removebg-preview (1).png";
import { Toaster, toast } from "react-hot-toast";

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
      }, 1000);
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
            Welcome Back Provider signup!
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="residenceName"
                className="block text-gray-700 font-bold text-sm mb-2"
              >
                Residence Name
              </label>
              <input
                type="text"
                id="residenceName"
                value={residenceName}
                onChange={(e) => setResidenceName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your residence name"
              />
              {residenceNameError && (
                <p className="text-red-500 mt-1">{residenceNameError}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold text-sm mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
              />
              {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold text-sm mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
              />
              {passwordError && (
                <p className="text-red-500 mt-1">{passwordError}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-bold text-sm mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Confirm your password"
              />
              {passwordError && (
                <p className="text-red-500 mt-1">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </form>
          <p className="text-gray-600 text-center mt-4 cursor-pointer">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/provider")}
              className="text-blue-600 hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProviderSignUp;
