import { useState } from "react";
import {  useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setProvider } from "../../features/providerAuth";
import axios from "axios";
import logo from "../../assets/Screenshot_2024-01-12_004511-removebg-preview (1).png";
import { Toaster, toast } from "react-hot-toast";

const ProviderLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:1997/provider/login",
        {
          email,
          password,
        }
      );

      console.log("response: ", response.data.msg);

      if (response.status === 200) {
        dispatch(setProvider(response.data.provider.providerEmail));
        toast.success(response.data.msg);

        setTimeout(() => {
          navigate("/provider/dashboard");
        }, 2000);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.log("response: ", error.response.data.msg);

      toast.error(error.response.data.msg);
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
            Welcome Back Provider!
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
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </form>
          <p className="text-gray-600 text-center mt-4 cursor-pointer">
            Dont have an account?{" "}
            <span
              onClick={() => navigate("/provider/signup")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
          <p
            onClick={() => navigate("/provider/otplogin")}
            className="text-blue-600 text-center cursor-pointer hover:text-blue-600 mt-4"
          >Login By OTP</p>
          <p
            onClick={() => navigate("/provider/forgotpassword")}
            className="text-red-600 text-center cursor-pointer hover:text-blue-600 mt-4"
          >
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProviderLogin;
