import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Screenshot_2024-01-12_004511-removebg-preview (1).png";
import { Toaster, toast } from "react-hot-toast";

const ProviderSignUp = () => {
  const navigate = useNavigate();
  const [residenceName, setResidenceName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
        setShowError(false); // Reset showError state after timeout
      }, 2000);
    }
  }, [error, navigate]);

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
      setShowError(true);
      return;
    }

    if (!validatePassword()) {
      setError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol"
      );
      setShowError(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:1997/provider/signup",
        {
          residenceName,
          email,
          mobile,
          password,
          confirmPassword,
        }
      );

      if (response.status === 201) {
        console.log("Sign up successful");
        toast.success("Sign up Successfull"); 
       setTimeout(() => {
        navigate("/provider");
        
       }, 2000);
      } else {
        console.error("Sign up failed");
      }
    } catch (error) {
      toast.error("Provider is already registerd please login"); 
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
          {showError && <p className="text-red-500 mb-2">{error}</p>}
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
