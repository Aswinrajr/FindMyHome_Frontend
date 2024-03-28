
import { FaFacebook, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';
import TopBar from '../../components/Sample/TopBar';
import Footer from '../../components/Sample/Footer';

const UserContact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <main className="flex-grow bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-6">
          Have any questions or suggestions? Feel free to reach out to us through any of the following channels.
        </p>
        <div className="flex items-center space-x-4 mb-4">
          <FaFacebook className="text-blue-500" />
          <span className="text-gray-700">Facebook</span>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <FaTwitter className="text-blue-400" />
          <span className="text-gray-700">Twitter</span>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <FaEnvelope className="text-red-500" />
          <span className="text-gray-700">Email: findmyhome@gmail.com</span>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <FaPhone className="text-green-500" />
          <span className="text-gray-700">Phone: +1234567890</span>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default UserContact;
