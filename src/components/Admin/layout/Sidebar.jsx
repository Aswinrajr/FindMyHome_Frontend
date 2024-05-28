import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../../features/adminAuth";
import { FaHome, FaUser, FaUsers, FaBriefcase, FaEnvelope, FaCog, FaQuestionCircle, FaSignOutAlt ,FaTag } from "react-icons/fa";
import axios from "axios";

const Sidebar = () => {
  let token = localStorage.getItem("accessToken");
  const newToken = JSON.parse(token);
  token = newToken?.accessToken;
  const adminUrl = import.meta.env.VITE_ADMIN_ROUTE;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMessagesCount, setActiveMessagesCount] = useState(0);

  useEffect(() => {
    const fetchActiveMessagesCount = async () => {
      try {
        const response = await axios.get(`${adminUrl}/confirmuser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("==-==>", response);
        if (response.status === 200) {
          setActiveMessagesCount(response.data.count || 0);
        } else {
          console.error("Failed to fetch active messages count");
        }
      } catch (error) {
        console.error("Error fetching active messages count:", error);
      }
    };

    fetchActiveMessagesCount();
  }, []);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin");
  };

  return (
    <div className="bg-gray-900 text-white h-full flex flex-col">
      <div className="flex flex-col py-4 px-6 border-b border-gray-800">
        <h2 className="text-lg font-semibold mb-2">Menu</h2>
        <ul className="space-y-2">
          <li
            className={`mb-4 ${
              location.pathname === "/admin/dashboard" ? "text-yellow-400" : ""
            }`}
          >
            <Link
              to="/admin/dashboard"
              className="block py-2 px-4 hover:text-yellow-400 flex items-center"
            >
              <FaHome className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li
            className={`mb-4 ${
              location.pathname === "/admin/users" ? "text-yellow-400" : ""
            }`}
          >
            <Link
              to="/admin/users"
              className="block py-2 px-4 hover:text-yellow-400 flex items-center"
            >
              <FaUser className="mr-2" />
              Users
            </Link>
          </li>
          <li
            className={`mb-4 ${
              location.pathname === "/admin/providers" ? "text-yellow-400" : ""
            }`}
          >
            <Link
              to="/admin/providers"
              className="block py-2 px-4 hover:text-yellow-400 flex items-center"
            >
              <FaUsers className="mr-2" />
              Providers
            </Link>
          </li>
          <li
            className={`mb-4 ${
              location.pathname === "/admin/bookings" ? "text-yellow-400" : ""
            }`}
          >
            <Link
              to="/admin/bookings"
              className="block py-2 px-4 hover:text-yellow-400 flex items-center"
            >
              <FaBriefcase className="mr-2" />
              Bookings
            </Link>
          </li>
          <li
            className={`mb-4 ${
              location.pathname === "/admin/messages" ? "text-yellow-400" : ""
            }`}
          >
            <Link
              to="/admin/messages"
              className="block py-2 px-4 hover:text-yellow-400 flex items-center"
            >
              <FaEnvelope className="mr-2" />
              Messages{" "}
              {activeMessagesCount > 0 && (
                <span className="bg-yellow-400 text-black rounded-full px-2 ml-2">
                  {activeMessagesCount}
                </span>
              )}
            </Link>
          </li>

          <li
            className={`mb-4 ${
              location.pathname === "/admin/settings" ? "text-yellow-400" : ""
            }`}
          >
            <Link
              to="/admin/settings"
              className="block py-2 px-4 hover:text-yellow-400 flex items-center"
            >
              <FaCog className="mr-2" />
              Settings
            </Link>
          </li>
          <li
            className={`mb-4 ${
              location.pathname === "/admin/offers" ? "text-yellow-400" : ""
            }`}
          >
            <Link
              to="/admin/offers"
              className="block py-2 px-4 hover:text-yellow-400 flex items-center"
            >
              <FaTag className="mr-2" />
              Offers
            </Link>
          </li>

          <li
            className={`mb-4 ${
              location.pathname === "/admin/help" ? "text-yellow-400" : ""
            }`}
          >
            <Link
              to="/admin/help"
              className="block py-2 px-4 hover:text-yellow-400 flex items-center"
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
