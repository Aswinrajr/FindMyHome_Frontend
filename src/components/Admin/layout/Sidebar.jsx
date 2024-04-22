import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from "../../../features/adminAuth";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin");
  };

  return (
    <div className="bg-fuchsia-700 text-white p-4 flex flex-col h-full justify-between sm:w-1/4 md:w-1/5 lg:w-1/6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Menu</h2>
        <ul>
          <li className={`mb-4 ${location.pathname === '/admin/users' ? 'text-yellow-400' : ''}`}>
            <Link to="/admin/users" className="block py-2 px-4 hover:text-yellow-400">Users</Link>
          </li>
          <li className={`mb-4 ${location.pathname === '/admin/providers' ? 'text-yellow-400' : ''}`}>
            <Link to="/admin/providers" className="block py-2 px-4 hover:text-yellow-400">Providers</Link>
          </li>
          <li className={`mb-4 ${location.pathname === '/admin/bookings' ? 'text-yellow-400' : ''}`}>
            <Link to="/admin/bookings" className="block py-2 px-4 hover:text-yellow-400">Bookings</Link>
          </li>
          <li className={`mb-4 ${location.pathname === '/admin/messages' ? 'text-yellow-400' : ''}`}>
            <Link to="/admin/messages" className="block py-2 px-4 hover:text-yellow-400">Messages</Link>
          </li>
          <hr className='w-full border-gray-600 my-4' />
          <li className={`mb-4 ${location.pathname === '/admin/settings' ? 'text-yellow-400' : ''}`}>
            <Link to="/admin/settings" className="block py-2 px-4 hover:text-yellow-400">Settings</Link>
          </li>
          <li className={`mb-4 ${location.pathname === '/admin/help' ? 'text-yellow-400' : ''}`}>
            <Link to="/admin/help" className="block py-2 px-4 hover:text-yellow-400">Help</Link>
          </li>
          <li onClick={handleLogout} className="mb-4 block py-2 px-4 cursor-pointer hover:text-yellow-400">
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
