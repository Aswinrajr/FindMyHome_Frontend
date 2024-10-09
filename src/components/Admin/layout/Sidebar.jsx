import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../../features/adminAuth";
import {
  FaHome,
  FaUser,
  FaUsers,
  FaBriefcase,
  FaEnvelope,
  FaSignOutAlt,
  FaTag,
  FaBars,
} from "react-icons/fa";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const adminUrl = import.meta.env.VITE_ADMIN_ROUTE;
  let token = localStorage.getItem("accessToken");
  const newToken = JSON.parse(token);
  token = newToken?.accessToken;
  const [activeMessagesCount, setActiveMessagesCount] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const fetchActiveMessagesCount = async () => {
      try {
        const response = await axios.get(`${adminUrl}/confirmuser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
  }, [adminUrl, token]);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="bg-gray-900 text-white h-full flex flex-col md:w-64">
      <div className="md:hidden flex justify-between items-center py-4 px-6 border-b border-gray-800">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <FaBars />
        </button>
      </div>
      <div
        className={`flex flex-col py-4 px-6 border-b border-gray-800 ${
          isCollapsed ? "hidden" : "block"
        } md:block`}
      >
        <h2 className="text-lg font-semibold mb-2 hidden md:block">Menu</h2>
        <ul className="space-y-2">
          <li
            className={`mb-4 ${
              location.pathname === "/admin/dashboard" ? "text-yellow-400" : ""
            }`}
          >
            <Link
              to="/admin/dashboard"
              className="py-2 px-4 hover:text-yellow-400 flex items-center"
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
              className="py-2 px-4 hover:text-yellow-400 flex items-center"
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
              className="py-2 px-4 hover:text-yellow-400 flex items-center"
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
              className="py-2 px-4 hover:text-yellow-400 flex items-center"
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
              className="py-2 px-4 hover:text-yellow-400 flex items-center"
            >
              <FaEnvelope className="mr-2" />
              Messages
              {activeMessagesCount > 0 && (
                <span className="bg-yellow-400 text-black rounded-full px-2 ml-2">
                  {activeMessagesCount}
                </span>
              )}
            </Link>
          </li>
          <li
            className={`mb-4 ${
              location.pathname === "/admin/offers" ? "text-yellow-400" : ""
            }`}
          >
            <Link
              to="/admin/offers"
              className="py-2 px-4 hover:text-yellow-400 flex items-center"
            >
              <FaTag className="mr-2" />
              Offers
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
