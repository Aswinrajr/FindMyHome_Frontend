import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import logo from "../../assets/Screenshot_2024-01-12_004511-removebg-preview (1).png";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../features/adminAuth";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const savedData = localStorage.getItem("admin");

  const adminRoute = import.meta.env.VITE_ADMIN_ROUTE;
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log("apiKey", apiKey, adminRoute);

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
    return password.length >= 6;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      setTimeout(() => {
        setErrors("");
      }, 1000);
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long",
      }));
      setTimeout(() => {
        setErrors("");
      }, 1000);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${adminRoute}/login`, {
        email,
        password,
      });
      console.log(response.data);

      if (response.status === 200) {
        dispatch(setAdmin(response.data.admin.adminEmail));
        setTimeout(() => {
          toast.success(response.data.msg);
        }, 1000);
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      } else {
        console.error("Login failed");
        if (response.data && response.data.msg) {
          toast.error(response.data.msg);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      }
    } catch (error) {
      console.error("Axios error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  if (savedData) return <Navigate to="/admin/dashboard" />;

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
            Welcome Back Admin!
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
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email ? "border-red-500" : ""
                }`}
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
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.password ? "border-red-500" : ""
                }`}
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
              {isLoading ? (
                <ClipLoader color={"#ffffff"} loading={isLoading} />
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p
            onClick={() => navigate("/admin/forgotpassword")}
            className="text-red-600 text-center cursor-pointer hover:text-blue-600 mt-4"
          >
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
