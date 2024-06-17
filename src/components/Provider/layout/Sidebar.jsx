import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutProvider } from "../../../features/providerAuth";
import {
  FaHome,
  FaBed,
  FaClipboardList,
  FaComments,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { verifyProvider } from "../../../service/Provider/LoginService";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [providerId, setProviderId] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await verifyProvider();
        console.log("---->", response);
        setProviderId(response.data.providerData._id);
      } catch (err) {
        console.log("Error in fetch provider", err);
        if (err) {
          dispatch(logoutProvider());
          navigate("/provider");
        }
      }
    };
    fetchProvider();
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logoutProvider());
    navigate("/provider");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="sm:hidden flex justify-between items-center py-4 px-6 border-b border-gray-800 bg-gray-900">
        <h2 className="text-lg font-semibold text-white">Menu</h2>
        <button onClick={toggleMenu} className="text-white">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:block bg-gray-900 text-white h-full sm:h-auto flex flex-col`}
      >
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
                onClick={() => setIsMenuOpen(false)}
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
                onClick={() => setIsMenuOpen(false)}
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
                onClick={() => setIsMenuOpen(false)}
              >
                <FaClipboardList className="mr-2" />
                Bookings
              </Link>
            </li>

            <li
              className={`hover:text-yellow-400 ${
                location.pathname === "/provider/chat" ? "text-yellow-400" : ""
              }`}
            >
              <Link
                to={`/provider/chat`}
                className="flex items-center px-4 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaComments className="mr-2" />
                Chat
              </Link>
            </li>
          </ul>
        </div>
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
    </div>
  );
};

export default Sidebar;
