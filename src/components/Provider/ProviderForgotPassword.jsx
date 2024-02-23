
import { useState } from 'react';

import logo from '../../assets/Screenshot_2024-01-12_004511-removebg-preview (1).png';
import axios from 'axios';
import { useNavigate } from 'react-router';


const ProviderForgotPassword = () => {
  const navigate = useNavigate()
  const [mobile, setMobile] = useState(0);
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    try {
      const response = await axios.post('http://localhost:1997/provider/reqotp', {
      mobile
      });
      console.log(response)
      if(response.status===200){
        navigate("/provider/verifyotp")
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row rounded-lg shadow-md w-full md:w-4/5 lg:w-3/4 xl:w-2/3 bg-white">
        <div className="md:w-1/2 bg-fuchsia-700 flex items-center justify-center rounded-t-lg">
          <img src={logo} alt="Logo" className="w-auto h-auto max-h-full object-contain" />
        </div>
        <div className="md:w-1/2 p-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-4 text-center text-blue-900">Forgot Password !</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label htmlFor="mobile" className="block text-gray-700 font-bold text-sm mb-2">
                Enter Your Mobile Number
              </label>
              <input
                type="number"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your mobile number"
                required
              />
            </div>
            
            <button
              type="submit"
              className="bg-orange-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Request for OTP
            </button>
          </form>
          <h1 onClick={()=>navigate("/provider/verifyotp")} >next</h1>
         
        </div>
      </div>
    </div>
  );
};

export default ProviderForgotPassword;
