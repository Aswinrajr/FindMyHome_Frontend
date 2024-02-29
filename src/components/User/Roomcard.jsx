import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Swal from "sweetalert2";

const Roomcard = () => {
  const baseRoute = import.meta.env.VITE_BASE_URL_ROUTE;
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [roomData, setRoomData] = useState([]);
  const user = localStorage.getItem("user");

  if (user) {
    console.log(user);
  } else {
    console.log("no user");

    Swal.fire({
      title: "user is not logged in please login",
      icon: "error",
      confirmButtonText: "OK",
    });
    navigate("/login")
    
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${baseRoute}/fetchdata`,
          data
        );
        console.log(response);
        if (response.status === 200) {
          setRoomData(response.data);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchData();
  }, [data]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleBook = async (roomId) => {
    const newData = {
      data,
      user,
    };

    try {
      const response = await axios.post(
        `${baseRoute}/bookroom/${roomId}`,
        newData
      );

      if (response.status === 200) {
        const bookingDetails = response.data.bookingDetails;

        const htmlContent = `
          <div>
            <p><strong>User ID:</strong> ${bookingDetails.userId}</p>
            <p><strong>Room ID:</strong> ${bookingDetails.roomId}</p>
            <p><strong>Provider ID:</strong> ${bookingDetails.providerId}</p>
            <p><strong>Room Type:</strong> ${bookingDetails.roomType}</p>
            <p><strong>Adults:</strong> ${bookingDetails.adults}</p>
            <p><strong>Children:</strong> ${bookingDetails.children}</p>
            <p><strong>Number of Days:</strong> ${bookingDetails.numberOfDays}</p>
            <p><strong>Check-in Date:</strong> ${bookingDetails.checkInDate}</p>
            <p><strong>Check-out Date:</strong> ${bookingDetails.checkOutDate}</p>
            <p><strong>Amount:</strong> ${bookingDetails.amount}</p>
            <p><strong>Total Amount to Pay:</strong> ${bookingDetails.totalAmounttoPay}</p>
            <p><strong>City:</strong> ${bookingDetails.city}</p>
          </div>
        `;

        Swal.fire({
          title: "Booking Details",
          html: htmlContent,
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            placeOrder(bookingDetails);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log("Booking cancelled");
          }
        });
      }
    } catch (error) {
      console.error("Error in booking:", error);
    }
  };

  const placeOrder = async (bookingDetails) => {
    try {
      const orderResponse = await axios.post(
        `${baseRoute}/placeorder`,
        bookingDetails
      );
      console.log("Order placed:", orderResponse.data);
      Swal.fire({
        title: "Room Booked Successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="room-cards-container">
      {roomData.map((item, index) => (
        <div
          key={index}
          className="room-card bg-white shadow-md p-4 rounded-lg mb-4 flex flex-col md:flex-row"
        >
          <div className="w-full md:w-1/2 pr-4">
            <Slider {...settings}>
              {item.room.images.map((image, imageIndex) => (
                <div key={imageIndex}>
                  <img
                    src={`http://localhost:1997/${image}`}
                    alt={`Room ${index} Image ${imageIndex}`}
                    className="w-full h-32 mb-4 object-cover rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-full md:w-1/2 pl-4">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {item.room.roomType}
                </h3>
                <p className="text-sm text-red-500 mb-2">
                  Amount: ₹{item.room.amount}
                </p>
                <div className="mb-2">
                  <span className="text-sm">Adults: {item.room.adults}</span>
                  <span className="text-sm ml-2">
                    Children: {item.room.children}
                  </span>
                </div>
                {/* <p className="text-sm text-gray-600 mb-2">Location: {item.room.location}</p> */}
                <p className="text-sm text-black-600 mb-2">
                  Away from: {item.distance.toFixed(2)} KM
                </p>
              </div>
              <button
                onClick={() => handleBook(item.room._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-auto"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Roomcard;
