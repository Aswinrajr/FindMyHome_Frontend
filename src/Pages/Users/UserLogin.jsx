import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import logo from "../../assets/Screenshot_2024-01-12_004511-removebg-preview (1).png";

import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userAuth";
import { userLogin } from "../../service/User/UserService";

const UserLogin = () => {
  const token = localStorage.getItem("userAccessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePassword = (password) => {
    if (password.length < 6) {
      return false;
    }

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;

    if (
      !uppercaseRegex.test(password) ||
      !lowercaseRegex.test(password) ||
      !symbolRegex.test(password) ||
      !numberRegex.test(password)
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setErrors({
        email: "Invalid email address",
        password: "Password must be at least 6 characters long",
      });
      setTimeout(() => {
        setErrors({});
      }, 1000);
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setErrors({
        password:
          "Password must be at least 6 characters long and contain an uppercase letter, a lowercase letter, a symbol, and a number",
      });
      setTimeout(() => {
        setErrors({});
      }, 1000);
      setIsLoading(false);
      return;
    }

    try {
      const response = await userLogin(email, password);
      console.log("Response:==>", response);

      if (response.status === 200) {
        console.log("Inside status 200", response.data);
        dispatch(setUser(response.data.token));
        toast.success(response.data.msg);
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else if (response.response.status === 401) {
        console.log("Haii", response.response.data.msg);
        toast.error(response.response.data.msg);
      } else if (response.response.status === 404) {
        console.log("Haii", response.response.data.msg);
        toast.error(response.response.data.msg);
      } else {
        toast.error("Some thing went wrong please try after some time");
      }
    } catch (error) {
      console.error("Axios error:", error);

      toast.error("An error occurred.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };


  if (token) return <Navigate to="/home" />;
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
            Welcome Back User!
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
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
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-gray-600 text-center mt-4 cursor-pointer">
            Dont have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
          <p
            onClick={() => navigate("/forgotpassword")}
            className="text-red-600 text-center cursor-pointer hover:text-blue-600 mt-4"
          >
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
