import { useState } from "react";

import logo from "../../assets/Screenshot_2024-01-12_004511-removebg-preview (1).png";
import axios from "axios";
import { useNavigate ,Navigate} from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from '../../features/userAuth'

const UserVerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(0);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userAuth.user);
  console.log(user)

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("axiosInstance: ",axiosAdminInstance.axiosAdminInstance)

    try {
      const response = await axios.post(
        "http://localhost:1997/verifyotp",
        {
          otp,
        }
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(setUser(response.data.user.userEmail));
        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (user) return <Navigate to="/home" />;
 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
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
            Verify OTP
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-bold text-sm mb-2"
              >
                Enter OTP
              </label>
              <input
                type="number"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter OTP"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-orange-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Verify OTP
            </button>
          </form>
          <h1 onClick={() => navigate("/home")}>next</h1>
        </div>
      </div>
    </div>
  );
};

export default UserVerifyOtp;
