import { useState, useEffect } from "react";
import { FaCheckCircle, FaArrowLeft, FaArrowRight, FaHome, FaRegCalendar, FaUsers, FaBed, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";
import TopBar from "../Sample/TopBar";
import { useLocation, useNavigate } from "react-router";

const BookingDetail = ({ icon: Icon, label, value, highlight }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <Icon className={`w-5 h-5 ${highlight ? 'text-blue-500' : 'text-gray-400'}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className={`mt-1 font-semibold ${highlight ? 'text-lg text-blue-600' : 'text-gray-900'}`}>
          {value}
        </p>
      </div>
    </div>
  </div>
);

const ImageGallery = ({ images, currentIndex, onPrevious, onNext }) => (
  <div className="relative aspect-[16/10] bg-gray-900 rounded-xl overflow-hidden group">
    <img
      src={images[currentIndex]}
      alt="Room View"
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
 
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button
        onClick={onPrevious}
        className="transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
      >
        <FaArrowLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        className="transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
      >
        <FaArrowRight className="w-5 h-5" />
      </button>
    </div>
    
    {/* Image Counter */}
    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {currentIndex + 1} / {images.length}
    </div>
  </div>
);

const SuccessPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location?.state?.data;
  const adress = location?.state?.adress;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading || !bookingData) {
    return (
      <>
        <TopBar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="space-y-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto" />
            <p className="text-lg text-gray-600 animate-pulse">
              Processing your booking...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <TopBar />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
   
          <div className="relative bg-blue-600 px-6 py-8 sm:px-8 sm:py-12">
            <div className="relative z-10 flex items-center space-x-4">
              <div className="flex-shrink-0 bg-white rounded-full p-3">
                <FaCheckCircle className="text-green-500 text-3xl sm:text-4xl" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Booking Confirmed
                </h1>
                <p className="mt-1 text-blue-100">
                  Your reservation has been successfully processed
                </p>
              </div>
            </div>
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
          </div>

       
          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           
              <ImageGallery
                images={bookingData.image}
                currentIndex={currentImageIndex}
                onPrevious={handlePrevImage}
                onNext={handleNextImage}
              />

             
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <BookingDetail 
                  icon={FaBed}
                  label="Room Type" 
                  value={bookingData.roomType}
                />
                <BookingDetail 
                  icon={FaUsers}
                  label="Adults" 
                  value={bookingData.adults}
                />
                <BookingDetail 
                  icon={FaUsers}
                  label="Children" 
                  value={bookingData.children}
                />
                <BookingDetail 
                  icon={FaRegCalendar}
                  label="Number of Days" 
                  value={bookingData.numberOfDays}
                />
                <BookingDetail 
                  icon={FaRegCalendar}
                  label="Check-In Date" 
                  value={bookingData.checkInDate}
                />
                <BookingDetail 
                  icon={FaRegCalendar}
                  label="Check-Out Date" 
                  value={bookingData.checkOutDate}
                />
                <BookingDetail 
                  icon={FaCreditCard}
                  label="Total Amount" 
                  value={bookingData.totalAmounttoPay}
                  highlight={true}
                />
                <BookingDetail 
                  icon={FaMapMarkerAlt}
                  label="Address" 
                  value={bookingData.Adress || adress}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100">
            <div className="px-6 py-8 sm:px-8 space-y-6">
              <div className="text-center space-y-2">
                <p className="text-gray-600">
                  Thank you for choosing our service!
                </p>
                <p className="text-sm text-gray-500">
                  A confirmation email has been sent to your registered email address
                </p>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={() => navigate("/")}
                  className="group inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                >
                  <FaHome className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform duration-300" />
                  <span>Return to Homepage</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
     
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need assistance? Contact our support team 24/7</p>
        </div>
      </main>
    </div>
  );
};

export default SuccessPage;