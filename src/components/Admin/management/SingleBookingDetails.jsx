import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { singleBookingDetails } from "../../../service/Admin/ManagementService";

const SingleBookingDetails = () => {
  const location = useLocation();
  const [bookingData, setBookingData] = useState(null);
  const { id } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await singleBookingDetails(id);
    
        if (Array.isArray(response.data.data)) {
          setBookingData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
    fetchData();
  }, [id]);



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-800">
        Booking Details
      </h1>
      {bookingData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-200 shadow-lg rounded-lg p-6">
          <div className="bg-white rounded-md p-6 shadow-md">
            <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-4">
              User Details
            </h2>
            <p className="text-gray-700 mb-2">
              Name: {bookingData[0].userName}
            </p>
            <p className="text-gray-700 mb-2">
              Email: {bookingData[0].userEmail}
            </p>
            <p className="text-gray-700 mb-2">
              Mobile: {bookingData[0].userMobile}
            </p>
            <p className="text-gray-700">
              Address: {bookingData[0].userAdress.join(", ")}
            </p>
          </div>
          <div className="bg-white rounded-md p-6 shadow-md">
            <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-4">
              Provider Details
            </h2>
            <p className="text-gray-700 mb-2">
              Name: {bookingData[1].providerName}
            </p>
            <p className="text-gray-700 mb-2">
              Email: {bookingData[1].providerEmail}
            </p>
            <p className="text-gray-700 mb-2">
              Mobile: {bookingData[1].providerMobile}
            </p>
            <p className="text-gray-700">
              Address: {bookingData[1].providerAddress}
            </p>
          </div>
          <div className="bg-blue-100 rounded-md p-6 shadow-md">
            <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-4">
              Booking Details
            </h2>
            <p className="text-red-600 font-bold mb-2">
              Booking ID: {bookingData[2].bookingId}
            </p>
            <p className="text-gray-700 mb-2">
              Room Type: {bookingData[2].roomType}
            </p>
            <p className="text-gray-700 mb-2">
              Amount: {bookingData[2].amount}
            </p>
            <p className="text-gray-700 mb-2">
              Check in Date: {bookingData[2].checkInDate}
            </p>
            <p className="text-gray-700 mb-2">
              Check out Date: {bookingData[2].checkOutDate}
            </p>
            <p className="text-gray-700 mb-2">
              Booking Date: {bookingData[2].bookingDate}
            </p>
            <p className="text-red-600 font-bold mb-2">
              Status: {bookingData[2].status}
            </p>
            <p className="text-gray-700 mb-2">
              Payment Mode: {bookingData[2].paymentMethod}
            </p>
            <p className="text-gray-700">
              Booking Address: {bookingData[1].providerAddress}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-700">Loading...</p>
      )}
    </div>
  );
};

export default SingleBookingDetails;
