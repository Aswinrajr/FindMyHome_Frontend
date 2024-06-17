import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { singleBookingProvider } from "../../service/Provider/LoginService";

const ProviderSingleBooking = () => {
  const [bookingData, setBookingData] = useState(null);
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await singleBookingProvider(id);
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
    <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
      Booking Details
    </h1>
    {bookingData ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg">
        <div className="p-6 md:p-8">
          <div className="bg-gray-100 rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              User Details
            </h2>
            <div className="space-y-2">
              <p className="text-gray-800">
                <span className="font-bold">Name:</span>{" "}
                {bookingData[0].userName}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Email:</span>{" "}
                {bookingData[0].userEmail}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Mobile:</span>{" "}
                {bookingData[0].userMobile}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Address:</span>{" "}
                {bookingData[0].userAdress.join(", ")}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="bg-gray-100 rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              Booking Details
            </h2>
            <div className="space-y-2">
              <p className="text-red-600">
                <span className="font-bold">Booking ID:</span>{" "}
                {bookingData[1].bookingId}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Room Type:</span>{" "}
                {bookingData[1].roomType}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Amount:</span>{" "}
                {bookingData[1].totalAmounttoPay}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Booking Date:</span>{" "}
                {bookingData[1].bookingDate}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Check in Date:</span>{" "}
                {bookingData[1].checkInDate}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Check out Date:</span>{" "}
                {bookingData[1].checkOutDate}
              </p>
              <p className="text-red-600">
                <span className="font-bold">Status:</span>{" "}
                {bookingData[1].status}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Payment Mode:</span>{" "}
                {bookingData[1].paymentMethod}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Booking Address:</span>{" "}
                {bookingData[2].providerAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 6V18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 12L18 14V10L16 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 12L6 10V14L8 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-4 text-gray-800">Loading...</p>
        </div>
      </div>
    )}
  </div>
  );
};

export default ProviderSingleBooking;