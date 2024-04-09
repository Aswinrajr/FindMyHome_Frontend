import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutProvider } from '../../../features/providerAuth';

const Sidebar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutProvider());
    navigate("/provider");
  };


  return (
    <div className="bg-fuchsia-700 text-white p-4 flex flex-col h-full justify-between sm:w-1/4 md:w-1/5 lg:w-1/6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Menu</h2>
        <ul>
     
          <li className={`mb-2 ${location.pathname === '/provider/rooms' ? 'text-yellow-400' : ''}`}>
            <Link to="/provider/rooms" className="block py-2 px-4 hover:text-yellow-400">Rooms</Link>
          </li>
          <li className={`mb-2 ${location.pathname === '/provider/bookings' ? 'text-yellow-400' : ''}`}>
            <Link to="/provider/bookings" className="block py-2 px-4 hover:text-yellow-400">Bookings</Link>
          </li>
          <li className={`mb-2 ${location.pathname === '/provider/messages' ? 'text-yellow-400' : ''}`}>
            <Link to="/provider/messages" className="block py-2 px-4 hover:text-yellow-400">Message</Link>
          </li>
         
          <li className={`mb-2 ${location.pathname === '/provider/settings' ? 'text-yellow-400' : ''}`}>
            <Link to="/provider/settings" className="block py-2 px-4 hover:text-yellow-400">Settings</Link>
          </li>
          <li className={`mb-2 ${location.pathname === '/provider/help' ? 'text-yellow-400' : ''}`}>
            <Link to="/provider/help" className="block py-2 px-4 hover:text-yellow-400">Help</Link>
          </li>
          <li onClick={handleLogout} className="mb-2 block py-2 px-4 cursor-pointer hover:text-yellow-400">
            Logout
          </li>
        </ul>
      </div>
      <div className="flex-grow"></div>
    </div>
  );
};

export default Sidebar;
