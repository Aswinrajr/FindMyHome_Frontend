import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/userAuth";
import { toast, Toaster } from "react-hot-toast";
import { userInstance } from "../../api/userInstance";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [count, setCount] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userToken = localStorage.getItem("userAccessToken");
  const newUserToken = JSON.parse(userToken);
  let extractedToken = newUserToken?.userAccessToken;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userInstance.get("/validateuser", {
          headers: {
            Authorization: `Bearer ${extractedToken}`,
          },
        });

        const validUser = response.data.userData;
        setCount(response.data.count);

        if (validUser) {
          return;
        }
        if (response.status === 403) {
          toast.error("User is blocked please contact admin");
          dispatch(logoutUser());
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      } catch (error) {
        if (error.response.status === 403) {
          toast.error("User is blocked please contact admin");
          dispatch(logoutUser());
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      }
    };

    fetchData();
  }, [extractedToken]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white text-black py-4 px-8 flex justify-between items-center relative z-10 shadow-lg">
      <div className="flex items-center space-x-4">
        <img src={logoImage} alt="Logo" className="h-8" />
        <span className="text-xl font-bold">FindMyHome</span>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="hidden md:flex space-x-4">
        <Link to="/" className="hover:text-gray-700">
          Home
        </Link>
        <Link to="/rentify" className="hover:text-gray-700">
          Rentify
        </Link>
        {userToken ? (
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
                    onClick={() => navigate("/cart")}
                    className="block px-4 py-2 hover:bg-gray-100 relative"
                  >
                    Cart
                    {count > 0 && (
                      <span className="absolute top-0 right-0 inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {count}
                      </span>
                    )}
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
        ) : (
          <Link to="/login" className="hover:text-gray-700">
            Login
          </Link>
        )}
        <Link to="/contact" className="hover:text-gray-700">
          Contact
        </Link>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
          <div className="flex flex-col space-y-4 p-4">
            <Link
              to="/"
              className="hover:text-gray-700"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/rentify"
              className="hover:text-gray-700"
              onClick={toggleMobileMenu}
            >
              Rentify
            </Link>
            {userToken ? (
              <>
                <Link
                  to="/userprofile"
                  className="hover:text-gray-700"
                  onClick={toggleMobileMenu}
                >
                  Profile
                </Link>
                <Link
                  onClick={() => {
                    navigate("/cart");
                    toggleMobileMenu();
                  }}
                  className="hover:text-gray-700 relative"
                >
                  Cart
                  {count > 0 && (
                    <span className="absolute top-0 right-0 inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {count}
                    </span>
                  )}
                </Link>
                <Link
                  onClick={() => {
                    handleLogout();
                    navigate("/");
                    toggleMobileMenu();
                  }}
                  className="hover:text-gray-700"
                >
                  Logout
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="hover:text-gray-700"
                onClick={toggleMobileMenu}
              >
                Login
              </Link>
            )}
            <Link
              to="/contact"
              className="hover:text-gray-700"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopBar;
