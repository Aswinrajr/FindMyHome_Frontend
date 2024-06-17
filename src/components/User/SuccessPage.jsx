import { useState } from "react";
import { FaCheckCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TopBar from "../Sample/TopBar";
import { useLocation, useNavigate } from "react-router";

const SuccessPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location?.state?.data;
  const adress=location?.state?.adress
  console.log(bookingData,adress);



  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? bookingData.image.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === bookingData.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
    <TopBar />
  
    {bookingData ? (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 w-full sm:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <FaCheckCircle className="text-green-500 text-6xl md:text-8xl mr-4" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Booking Confirmed
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-80 md:h-auto">
              <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4">
                <button
                  className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"
                  onClick={handlePrevImage}
                >
                  <FaArrowLeft />
                </button>
                <button
                  className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"
                  onClick={handleNextImage}
                >
                  <FaArrowRight />
                </button>
              </div>
              <img
                src={bookingData.image[currentImageIndex]}
                alt="Room"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="font-bold">Room Type:</span>{" "}
                {bookingData.roomType}
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Adults:</span>{" "}
                {bookingData.adults}
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Children:</span>{" "}
                {bookingData.children}
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Number of Days:</span>{" "}
                {bookingData.numberOfDays}
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Check-In Date:</span>{" "}
                {bookingData.checkInDate}
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Check-Out Date:</span>{" "}
                {bookingData.checkOutDate}
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Total Amount:</span>{" "}
                {bookingData.totalAmounttoPay}
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Address:</span>{" "}
                {bookingData.Adress || adress}
              </div>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-8">
            Thank you for booking with us!
          </p>
          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              onClick={() => navigate("/")}
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">
          Loading....
        </div>
      </div>
    )}
  </>
  
  );
};

export default SuccessPage;
