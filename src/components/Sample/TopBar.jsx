import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/userAuth";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <nav className="bg-white text-black py-4 px-8 flex justify-between items-center relative z-10 shadow-lg">
      <div className="flex items-center space-x-4">
        <img src={logoImage} alt="Logo" className="h-8" />
        <span className="text-xl font-bold">FindMyHome</span>
      </div>
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-gray-700">
          Home
        </Link>
        <Link to="/rentify" className="hover:text-gray-700">
          Rentify
        </Link>
        {user ? (
          <>
            <div className="relative">
              <button
                onClick={toggleOptions}
                className="hover:text-gray-700 focus:outline-none"
              >
                Account
              </button>
              {showOptions && (
                <ul className="absolute p-4 top-12 right-0 bg-white border border-gray-200 rounded shadow-md z-20 space-y-1">
                  <li>
                    <Link
                      to="/userprofile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={() => {
                        handleLogout();
                        navigate("/");
                      }}
                      to="/"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="hover:text-gray-700">
            Login
          </Link>
        )}
        <Link to="/contact" className="hover:text-gray-700">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default TopBar;
