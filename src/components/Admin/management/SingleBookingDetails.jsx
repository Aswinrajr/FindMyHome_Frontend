import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { singleBookingDetails } from "../../../service/Admin/ManagementService";

const SingleBookingDetails = () => {
  const [bookingData, setBookingData] = useState(null);
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await singleBookingDetails(id);
        console.log("Response: ", response);
        if (Array.isArray(response.data.data)) {
          setBookingData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
    fetchData();
  }, [id]);

  console.log("==>", bookingData);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Booking Details</h1>
      {bookingData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-200 shadow-lg rounded-lg p-4">
          <div className="bg-white rounded-md p-4">
            <h2 className="text-lg font-bold text-blue-600">User Details</h2>
            <p className="text-gray-800">Name: {bookingData[0].userName}</p>
            <p className="text-gray-800">Email: {bookingData[0].userEmail}</p>
            <p className="text-gray-800">Mobile: {bookingData[0].userMobile}</p>
            <p className="text-gray-800">Address: {bookingData[0].userAdress.join(", ")}</p>
          </div>
          <div className="bg-white rounded-md p-4">
            <h2 className="text-lg font-bold text-blue-600">Provider Details</h2>
            <p className="text-gray-800">Name: {bookingData[1].providerName}</p>
            <p className="text-gray-800">Email: {bookingData[1].providerEmail}</p>
            <p className="text-gray-800">Mobile: {bookingData[1].providerMobile}</p>
            <p className="text-gray-800">Address: {bookingData[1].providerAddress}</p>
          </div>
          <div className="bg-teal-100 rounded-md p-4 col-span-2">
            <h2 className="text-lg font-bold text-blue-600">Booking Details</h2>
            <p className="text-red-600">Booking ID: {bookingData[2].bookingId}</p>
            <p className="text-gray-800">Room Type: {bookingData[2].roomType}</p>
            <p className="text-gray-800">Amount: {bookingData[2].amount}</p>
            <p className="text-gray-800">Check in Date: {bookingData[2].checkInDate}</p>
            <p className="text-gray-800">Check out Date: {bookingData[2].checkOutDate}</p>
            <p className="text-gray-800">Booking Date: {bookingData[2].bookingDate}</p>
            <p className="text-red-600">Status: {bookingData[2].status}</p>
            <p className="text-gray-800">Payment Mode: {bookingData[2].paymentMethod}</p>
            <p className="text-gray-800">Booking Address: {bookingData[1].providerAddress}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-800">Loading...</p>
      )}
    </div>
  );
};

export default SingleBookingDetails;
