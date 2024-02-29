import { Link } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/userAuth";
import {  useNavigate } from "react-router";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=>state.userAuth.user);
  // const newUser= localStorage.getItem("user")


  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  // if(!newUser) return <Navigate to="/"/>

  return (
    <nav className="bg-white text-black py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logoImage} alt="Logo" className="h-8 mr-4" /> 
        <span className="text-xl font-bold">FindMyHome</span>
      </div>
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/rentify" className="hover:text-gray-300">Rentify</Link>
        {user ? (
          <>
            <Link to="/account" className="hover:text-gray-300">Account</Link>
            <Link onClick={handleLogout} className="hover:text-gray-300">Logout</Link>
          </>
        ) : (
          <Link to="/login" className="hover:text-gray-300">Login</Link>
        )}
        <Link to="/contact" className="hover:text-gray-300">Contact</Link>
      </div>
    </nav>
  );
};

export default TopBar;
