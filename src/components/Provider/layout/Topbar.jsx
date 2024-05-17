import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../../assets/logo.png";
import profilePic from "../../../assets/roomimage.webp";
import { useEffect, useState } from "react";
import { verifyProvider } from "../../../service/Provider/LoginService";
import { logoutProvider } from "../../../features/providerAuth";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Topbar = () => {
  const [email, setEmail] = useState();
  const dispatch = useDispatch()
  const navigate= useNavigate()

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await verifyProvider();
        console.log("---->",response)

        setEmail(response.data.providerData);
      } catch (err) {
        console.log("Error in fetch provider0", err);
        if (err) {
          toast.error("Some thing Went wrong please contact admin")
          dispatch(logoutProvider());
          navigate("/provider");
        }
      }
    };
    fetchProvider();
  }, []);

  return (
    <div className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <img src={logoImage} alt="Logo" className="h-8 mr-4" />
      </div>

      <div className="flex items-center space-x-6">
        <Link
          to="/provider/account"
          className="flex items-center text-sm hover:text-yellow-400 transition-colors duration-300"
        >
          <img
            src={profilePic}
            alt="Profile"
            className="h-8 mr-4 rounded-full"
          />
          <p>{email?.providerEmail}</p>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
