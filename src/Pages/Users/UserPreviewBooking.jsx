import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import TopBar from "../../components/Sample/TopBar";
import Footer from "../../components/Sample/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Navigate } from "react-router";
import {
  cancelBooking,
  userBookingPreview,
} from "../../service/User/UserService";
import Swal from "sweetalert2"; // Import SweetAlert

const UserPreviewBooking = () => {
  const user = localStorage.getItem("userAccessToken");
  const [bookingData, setBookingdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userBookingPreview();

        setBookingdata(response.data.data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    fetchData();
  }, []);
  if (!user) return <Navigate to="/" />;

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

  const handleCancel = async (bookingId) => {
    console.log(bookingId);
    const confirmCancel = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirmCancel.isConfirmed) {
      try {
        const response = await cancelBooking(bookingId);
        console.log(response);
        Swal.fire("Canceled!", "Your booking has been canceled.", "success");
      } catch (err) {
        console.log("Error in cancel booking", err);
        Swal.fire(
          "Error!",
          "Failed to cancel booking. Please try again.",
          "error"
        );
      }
    }
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
                      src={`${imageUrl}`}
                      alt={`Room ${index + 1}`}
                      style={imageStyle}
                      className="w-full h-auto rounded-lg object-cover"
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
                    Booking Date:{" "}
                    {`${booking.bookingDate}`.toString().split("T")[0]}
                  </p>
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
                  <p className="text-sm text-red-600 mb-2">
                    Address: {booking.Adress}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    status: {booking.status}
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
             
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
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
