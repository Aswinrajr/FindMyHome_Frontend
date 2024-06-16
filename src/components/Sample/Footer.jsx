import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="mt-auto py-6 px-8 text-center bg-gray-800 text-white">
      <div className="flex flex-col items-center mb-4">
        <div className="flex items-center mb-2">
          <img src={logo} alt="Company Logo" className="h-8 mr-2" />
          <h2 className="text-lg font-bold">FindMyHome</h2>
        </div>
        <p className="mb-2">&copy; 2024 FindMyHome</p>
      </div>
      <div className="flex justify-center space-x-4">
        <a href="#" className="text-gray-300 hover:text-gray-400">
          Terms of Service
        </a>
        <a href="#" className="text-gray-300 hover:text-gray-400">
          Privacy Policy
        </a>
        <a href="#" className="text-gray-300 hover:text-gray-400">
          Contact Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;
