import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Screenshot_2024-01-12_004511-removebg-preview (1).png";
import { Toaster, toast } from "react-hot-toast";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateMobile = () => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const validatePassword = () => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(
      password
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateMobile()) {
      setError("Mobile number must be 10 digits");
    }

    if (!validatePassword()) {
      setError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol"
      );
    }

    try {
      const response = await axios.post("http://localhost:1997/signup", {
        userName,
        email,
        mobile,
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
        toast.error(response.data.msg);
      }
    } catch (error) {
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
            Welcome Back User signup!
          </h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="userName"
                className="block text-gray-700 font-bold text-sm mb-2"
              >
                User Name
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
                required
              />
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
                required
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-bold text-sm mb-2"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your mobile number"
                required
              />
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
                required
              />
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Confirm your password"
                required
              />
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
              onClick={() => navigate("/login")}
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

export default SignUpPage;
