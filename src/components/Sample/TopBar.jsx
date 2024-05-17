import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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

  const userToken = localStorage.getItem("userAccessToken");

  const newUserToken = JSON.parse(userToken);
  let extractedToken = newUserToken?.userAccessToken;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userInstance.get(
          `/validateuser`,

          {
            headers: {
              Authorization: `Bearer ${extractedToken}`,
            },
          }
        );
        console.log("response in navbar", response);
        const validUser = response.data.userData;
        setCount(response.data.count);
        console.log(validUser);

        if (validUser) {
          return;
        }
        if (response.status === 403) {
          toast.error("User is blocked please contact admin");
          dispatch(logoutUser());
          setTimeout(() => {
            return <Navigate to="/login" />;
          }, 1000);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.response.status);
        if (error.response.status=== 403) {
          toast.error("User is blocked please contact admin");
          dispatch(logoutUser());
          setTimeout(() => {
            return <Navigate to="/login" />;
          }, 1000);
        }

        // dispatch(logoutUser());

        return <Navigate to="/login" />;
      }
    };

    fetchData(); 
  }, [extractedToken]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const toggleOptions = () => {
    console.log("Clicked")
    setShowOptions(!showOptions);
  };

  return (
    <nav className="bg-white text-black py-4 px-8 flex justify-between items-center relative z-10 shadow-lg">
      <div className="flex items-center space-x-4">
        <img src={logoImage} alt="Logo" className="h-8" />
        <span className="text-xl font-bold">FindMyHome</span>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-gray-700">
          Home
        </Link>
        <Link to="/rentify" className="hover:text-gray-700">
          Rentify
        </Link>
        {userToken ? (
          <>
            <div className="relative">
              <button
                onClick={()=>toggleOptions()}
                className="hover:text-gray-700  focus:outline-none"
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
                  <Link
                    onClick={() => {
                      navigate("/cart");
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 relative"
                  >
                    Cart
                    {count > 0 && (
                      <span className="absolute top-0 right-0 inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {count}
                      </span>
                    )}
                  </Link>

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
