import { Navigate, useNavigate } from "react-router";
import Footer from "../../components/Sample/Footer";
import TopBar from "../../components/Sample/TopBar";

import { Toaster, toast } from "react-hot-toast";
import { rentifyUser } from "../../service/User/UserService";

const UserRentify = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("userAccessToken");

  const handleAgree = () => {
    try {
      const roleChange = async () => {
        const changeRole = await rentifyUser();

        console.log(changeRole);
        if (changeRole.status === 200) {
          toast.success(changeRole.data.message);
          setTimeout(() => {
            navigate("/userprofile");
          }, 1500);
        }
      };
      roleChange();
    } catch (err) {
      console.log("Error in user registrayion as provider", err);
      toast.error("Some thing went wrong !! please try after some time");
    }
  };
  if (!user) return <Navigate to="/" />;

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <main className="flex-grow bg-white rounded-lg shadow-md p-6 mt-16">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <h1 className="text-2xl font-bold mb-4">
          Registration for Rentify Room
        </h1>
        <p className="text-gray-600 mb-6">
          Rentify is your gateway to effortless room rental management. Whether
          youre a homeowner looking to monetize your space or a traveler seeking
          cozy accommodations, Rentify has you covered.
        </p>
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Terms and Conditions</h2>
          <p className="text-sm text-gray-700 mb-2">
            By proceeding, you agree to abide by Rentifys terms and conditions.
            Please read them carefully.
          </p>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm2.646-10.354a.5.5 0 00-.707 0l-3.5 3.5a.5.5 0 10.707.707L11 10.707l2.646-2.646a.5.5 0 000-.707z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-700">I Agree to the Terms</span>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button
            onClick={handleAgree}
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg focus:ring-4 focus:ring-blue-300 text-sm mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm2.646-10.354a.5.5 0 00-.707 0l-3.5 3.5a.5.5 0 10.707.707L11 10.707l2.646-2.646a.5.5 0 000-.707z"
                clipRule="evenodd"
              />
            </svg>
            I Agree
          </button>
          <button
            onClick={() => navigate("/home")}
            className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-lg focus:ring-4 focus:ring-gray-300 text-sm"
          >
            Cancel
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserRentify;
