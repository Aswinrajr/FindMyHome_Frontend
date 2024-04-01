import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import TopBar from "../../components/Sample/TopBar";
import Footer from "../../components/Sample/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Navigate } from "react-router";

const UserPreviewBooking = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL_ROUTE;
  const user = localStorage.getItem("user");
  const [bookingData, setBookingdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${baseUrl}/getuserbookings`, {
          user,
        });
        setBookingdata(response.data.data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    fetchData();
  }, []);
  if(!user) return <Navigate to="/login"/>

  const renderSeal = (status) => {
    if (status === "confirmed") {
      return (
        <div className="absolute top-0 left-0 mt-1 ml-1 flex items-start">
          <FaCheckCircle className="text-green-500 text-xl" />
          <span className="text-green-500 text-sm font-semibold ml-1">
            Confirmed
          </span>
        </div>
      );
    } else if (status === "canceled") {
      return (
        <div className="absolute top-0 left-0 mt-1 ml-1 flex items-start">
          <FaTimesCircle className="text-red-500 text-xl" />
          <span className="text-red-500 text-sm font-semibold ml-1">
            Canceled
          </span>
        </div>
      );
    }
    return null;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const imageStyle = {
    width: "100%",
    height: "250px",
    objectFit: "fill",
    borderRadius: "10px",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <div className="flex-grow bg-white shadow-md rounded-lg overflow-hidden mx-auto max-w-screen-lg my-8">
        {bookingData.map((booking) => (
          <div
            key={booking._id}
            className="relative p-4 border-b border-gray-300 mb-4 flex"
          >
            <div className="w-2/3 pr-4">
              <Slider {...sliderSettings}>
                {booking.image.map((imageUrl, index) => (
                  <div key={index}>
                    <img
                      src={`${baseUrl}/${imageUrl}`}
                      alt={`Room ${index + 1}`}
                      style={imageStyle}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="w-2/3 pl-4">
              <div className="flex items-center">
                {renderSeal(booking.status)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Room Type: {booking.roomType}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Check-In Date:{" "}
                    {`${booking.checkInDate}`.toString().split("T")[0]}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Check-Out Date:{" "}
                    {`${booking.checkOutDate}`.toString().split("T")[0]}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Amount: {booking.amount}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Adults: {booking.adults}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Children: {booking.children}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Address: {booking.city}
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline">
                  View Booking
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default UserPreviewBooking;
