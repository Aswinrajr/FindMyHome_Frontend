import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Toaster, toast } from "react-hot-toast";
import backgroundImage from "../../assets/queen-937501_1280.jpg";

const SignUpPage = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL_ROUTE;
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location.state", location.state);
  const { phoneNumber } = location.state ? location.state : "";
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  console.log("phoneNumber==>", phoneNumber);

  const validatePassword = () => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(
      password
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userName || !email || !password || !confirmPassword) {
      setError("Please fill in all the fields.");
      setTimeout(() => {
        setError("");
      }, 1000);

      return;
    }

    if (!validatePassword()) {
      setError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol"
      );
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/signup`, {
        userName,
        email,
        mobile: phoneNumber,
        password,
        confirmPassword,
      });
      console.log(response);

      if (response.status === 201) {
        console.log("Sign up successful");
        toast.success("Sign up successful");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        console.error("Sign up failed");
        toast.error(error.response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
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
        Welcome Back User signup!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
          {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
            <label
              htmlFor="userName"
              className="block text-gray-700 font-semibold text-sm mb-2"
            >
                User Name
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your user name"
            />
           
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
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
