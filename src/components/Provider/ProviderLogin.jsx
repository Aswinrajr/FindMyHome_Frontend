import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProvider } from "../../features/providerAuth";
import { Toaster, toast } from "react-hot-toast";
import { providerLogin } from "../../service/Provider/LoginService";
import { FaEnvelope, FaLock } from "react-icons/fa";
import backgroundImage from "../../assets/queen-937501_1280.jpg";
import companyLogo from "../../assets/logo.png";

const ProviderLogin = () => {
  const token = localStorage.getItem("providerAccessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!email && !password) {
      setEmailError("Please enter your email");
      setPasswordError("Please enter your password");
      setTimeout(() => {
        setEmailError("");
        setPasswordError("");
      }, 1000);

      setLoading(false);
      return;
    } else if (!email) {
      setEmailError("Please enter your email");
      setTimeout(() => {
        setEmailError("");
        setPasswordError("");
      }, 1000);
      setLoading(false);
      return;
    } else if (!password) {
      setPasswordError("Please enter your password");
      setTimeout(() => {
        setEmailError("");
        setPasswordError("");
      }, 1000);
      setLoading(false);
      return;
    }

    try {
      const response = await providerLogin(email, password);

     

      if (response.status === 200) {
        dispatch(setProvider(response.data.token));

        setTimeout(() => {
          toast.success(response.data.msg);
        }, 1000);

        setTimeout(() => {
          navigate("/provider/dashboard");
        }, 2000);
      } else if (response.response.status === 401) {
       
        toast.error(response.response.data.msg);
      } else {
        toast.error(response.response.data.msg);
      }
    } catch (error) {
     
      toast.error(error.response.data.msg);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (token) return <Navigate to="/provider/dashboard" />;

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <img src={companyLogo} alt="Company Logo" className="h-12 w-auto " />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Provider Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
              />
            </div>
            {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
              />
            </div>
            {passwordError && (
              <p className="text-red-500 mt-1">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Verifying..." : "Login"}
          </button>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">
              Dont have an account?{" "}
              <span
                onClick={() => navigate("/provider/mobilesignup")}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </p>
            <p
              onClick={() => navigate("/provider/forgotpassword")}
              className="text-indigo-600 text-sm cursor-pointer hover:underline"
            >
              Forgot Password?
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProviderLogin;
