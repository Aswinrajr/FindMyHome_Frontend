import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import TopBar from "../../components/Sample/TopBar";
import Footer from "../../components/Sample/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Navigate, useNavigate } from "react-router";
import {
  cancelBooking,
  userBookingPreview,
} from "../../service/User/UserService";
import Swal from "sweetalert2";

const UserPreviewBooking = () => {
  const user = localStorage.getItem("userAccessToken");
  const [bookingData, setBookingData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userBookingPreview();
        console.log("Fetching the bookings", response);

        setBookingData(response.data.data);
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
        <div className="absolute top-2 left-2 flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full">
          <FaCheckCircle className="text-green-500 mr-1" />
          <span className="text-sm font-semibold">Confirmed</span>
        </div>
      );
    } else if (status === "canceled") {
      return (
        <div className="absolute top-2 left-2 flex items-center px-2 py-1 bg-red-100 text-red-700 rounded-full">
          <FaTimesCircle className="text-red-500 mr-1" />
          <span className="text-sm font-semibold">Canceled</span>
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
    objectFit: "cover",
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
        console.log("response in cancel booking", response);
        Swal.fire("Canceled!", "Your booking has been canceled.", "success");
        setBookingData((prevData) =>
          prevData.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "canceled" }
              : booking
          )
        );
        setTimeout(() => {
          navigate("/userprofile");
        }, 1500);
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TopBar />
      <main className="flex-grow container mx-auto px-4 py-8 ">
        <div className="bg-white rounded-lg shadow-md overflow-hidden ">
          {bookingData.map((booking) => (
            <div
              key={booking._id}
              className="relative p-4 border-b border-gray-200 last:border-b-0 "
            >
              {renderSeal(booking.status)}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Slider {...sliderSettings}>
                    {booking.image.map((imageUrl, index) => (
                      <div key={index}>
                        <img
                          src={`${imageUrl}`}
                          alt={`Room ${index + 1}`}
                          style={imageStyle}
                          className="w-80 h-56 rounded-lg object-cover  mt-13"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Room Type: {booking.roomType}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Booking Date:{" "}
                    {`${booking.bookingDate}`.toString().split("T")[0]}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Check-In Date:{" "}
                    {`${booking.checkInDate}`.toString().split("T")[0]}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Check-Out Date:{" "}
                    {`${booking.checkOutDate}`.toString().split("T")[0]}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Amount: {booking.amount}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Adults: {booking.adults}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Children: {booking.children}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Status: {booking.status}
                  </p>
                  <p className="text-sm text-red-600 mb-1">
                    Address: {booking.Adress}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className={`bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        booking.status === "cancel"
                          ? "opacity-50 cursor-not-allowed "
                          : ""
                      }`}
                      disabled={booking.status === "cancel"}
                    >
                      {booking.status === "cancel"
                        ? "Booking Canceled"
                        : "Cancel Booking"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserPreviewBooking;
