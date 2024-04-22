import  { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import logo from "../../assets/Screenshot_2024-01-12_004511-removebg-preview (1).png";

import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../features/adminAuth";
import ClipLoader from "react-spinners/ClipLoader";

import { adminLogin } from "../../service/Admin/LoginServices";

const Login = () => {
  const token = localStorage.getItem("accessToken");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (token) return <Navigate to="/admin/dashboard" />;

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
      console.log("Before API Call");
      const response = await adminLogin(email, password);
      console.log("After API Call:", response);

      if (response.status === 200) {
        dispatch(setAdmin(response.data.token));
        setTimeout(() => {
          toast.success(response.data.msg);
        }, 1000);
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      } else if (response.response.status === 401) {
        console.error("Login failed", response.response);
        if (response.response.data && response.response.data.msg) {
          toast.error(response.response.data.msg);
        }
      } else {
        toast.error(response.response.data.msg);
      }
    } catch (error) {
      console.log("======>", error);
      console.error("Axios error:", error.response.data.msg);
      toast.error(error.response.response.data.msg);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
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
