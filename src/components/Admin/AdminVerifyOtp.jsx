import { useState } from "react";
import logo from "../../assets/Screenshot_2024-01-12_004511-removebg-preview (1).png";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAdmin } from '../../features/adminAuth'
import { toast, Toaster } from "react-hot-toast";

const AdminVerifyOtp = () => {
  const adminRoute = import.meta.env.VITE_ADMIN_ROUTE;
  const token = localStorage.getItem('accessToken')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [err,setErr] = useState()



  const handleSubmit = async (event) => {
    event.preventDefault();
    if(otp.length===0){
      setErr("OTP is required")
      setTimeout(() => {
        setErr("")
        
      }, 1000);
      return
    }
    try {
      console.log('HANDLE SUBMIT');
      const response = await axios.post(
        `${adminRoute}/verifyotp`,
        { otp }
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(setAdmin(response.data.token));
        toast.success("Admin Login Successful");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Incorrect OTP");
    }
  };

  const handleInputChange = (e) => {

    const value = e.target.value.replace(/\D/g, ''); 
    
    if (value.length <= 6) {
      setOtp(value);
    }
  };
  if(token) return <Navigate to="/admin/dashboard"/>

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
            Verify OTP
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-gray-700 font-bold text-sm mb-2"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter OTP"
                pattern="\d*"
                inputMode="numeric"
                maxLength={5} 
             
              />
              {err&& (
                <p className="text-red-500 text-lg mt-2">
                  {err}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-orange-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Verify OTP
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AdminVerifyOtp;
