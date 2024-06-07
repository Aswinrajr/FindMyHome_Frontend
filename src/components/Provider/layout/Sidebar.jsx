import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutProvider } from "../../../features/providerAuth";
import {
  FaHome,
  FaBed,
  FaClipboardList,
  FaEnvelope,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaComments
} from "react-icons/fa";
import { verifyProvider } from "../../../service/Provider/LoginService";
import { useEffect } from "react";
import { useState } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [providerId,setProviderId] = useState()

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await verifyProvider();
        console.log("---->",response)
        setProviderId(response.data.providerData._id)

       
      } catch (err) {
        console.log("Error in fetch provider0", err);
        if (err) {
         
          dispatch(logoutProvider());
          navigate("/provider");
        }
      }
    };
    fetchProvider();
  }, []);

  const handleLogout = () => {
    dispatch(logoutProvider());
    navigate("/provider");
  };

  return (
    <div className="bg-gray-900 text-white h-full flex flex-col">
      <div className="flex flex-col py-4 px-6 border-b border-gray-800">
        <h2 className="text-lg font-semibold mb-2">Menu</h2>
        <ul className="space-y-2">
          <li
            className={`hover:text-yellow-400 ${
              location.pathname === "/provider/dashboard"
                ? "text-yellow-400"
                : ""
            }`}
          >
            <Link
              to="/provider/dashboard"
              className="flex items-center px-4 py-2 rounded-md"
            >
              <FaHome className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li
            className={`hover:text-yellow-400 ${
              location.pathname === "/provider/rooms" ? "text-yellow-400" : ""
            }`}
          >
            <Link
              to="/provider/rooms"
              className="flex items-center px-4 py-2 rounded-md"
            >
              <FaBed className="mr-2" />
              Rooms
            </Link>
          </li>
          <li
            className={`hover:text-yellow-400 ${
              location.pathname === "/provider/bookings"
                ? "text-yellow-400"
                : ""
            }`}
          >
            <Link
              to="/provider/bookings"
              className="flex items-center px-4 py-2 rounded-md"
            >
              <FaClipboardList className="mr-2" />
              Bookings
            </Link>
          </li>
          {/* <li
            className={`hover:text-yellow-400 ${
              location.pathname === "/provider/messages"
                ? "text-yellow-400"
                : ""
            }`}
          >
            <Link
              to="/provider/messages"
              className="flex items-center px-4 py-2 rounded-md"
            >
              <FaEnvelope className="mr-2" />
              Messages
            </Link>
          </li> */}
          {/* <li
            className={`hover:text-yellow-400 ${
              location.pathname === "/provider/settings"
                ? "text-yellow-400"
                : ""
            }`}
          >
            <Link
              to="/provider/settings"
              className="flex items-center px-4 py-2 rounded-md"
            >
              <FaCog className="mr-2" />
              Settings
            </Link>
          </li> */}
          <li
            className={`hover:text-yellow-400 ${
              location.pathname === "/provider/chat"
                ? "text-yellow-400"
                : ""
            }`}
          >
            <Link
              to={`/provider/chat`}
              className="flex items-center px-4 py-2 rounded-md"
            >
              <FaComments className="mr-2" />
              Chat
            </Link>
          </li>
          <li
            className={`hover:text-yellow-400 ${
              location.pathname === "/provider/contact" ? "text-yellow-400" : ""
            }`}
          >
            <Link
              to="/provider/help"
              className="flex items-center px-4 py-2 rounded-md"
            >
              <FaQuestionCircle className="mr-2" />
              Help
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-grow"></div>
      <div className="py-4 px-6 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-start text-left text-sm hover:text-yellow-400"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
