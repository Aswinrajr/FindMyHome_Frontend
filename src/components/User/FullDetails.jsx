import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Swal from "sweetalert2";
import { FaWifi, FaTv, FaSnowflake, FaUtensils, FaBath } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import TopBar from "../Sample/TopBar";
import Footer from "../Sample/Footer";
import logo from "../../assets/logo.png";

import { bookRoomPage, roomViewPage } from "../../service/User/UserService";

const facilitiesData = [
  { icon: FaWifi, text: "Free Wi-Fi" },
  { icon: FaTv, text: "Flat-screen TV" },
  { icon: FaSnowflake, text: "Air conditioning" },
  { icon: FaUtensils, text: "Mini fridge" },
  { icon: FaBath, text: "Private bathroom" },
];

const FullDetails = () => {
  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const navigate = useNavigate();
  const baseRoute = import.meta.env.VITE_BASE_URL_ROUTE;
  const { id } = useParams();
  const [roomData, setRoomData] = useState(null);
  const user = localStorage.getItem("userAccessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await roomViewPage(id);

        setRoomData(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    fetchData();
  }, [baseRoute, id]);

  const handleBookNow = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Enter Booking Details",
      html:
        '<input id="checkInDate" class="swal2-input" type="date"  placeholder="Check-in Date">' +
        '<input id="checkOutDate" class="swal2-input" type="date"  placeholder="Check-out Date">' +
        '<input id="adults" class="swal2-input" type="number" placeholder="Number of Adults">' +
        '<input id="children" class="swal2-input" type="number" placeholder="Number of Children">',
      focusConfirm: false,
      preConfirm: () => {
        return {
          checkInDate: document.getElementById("checkInDate").value,
          checkOutDate: document.getElementById("checkOutDate").value,
          adults: document.getElementById("adults").value,
          children: document.getElementById("children").value,
        };
      },
    });

    if (formValues) {
      const data = {
        formData: formValues,
        user,
      };
      console.log(formValues);
      console.log(roomData._id);
      const response = await bookRoomPage(roomData._id, data);

      console.log(response);
      if (response.status === 200) {
        const bookingDetails = response.data.bookingDetails;

        const htmlContent = `
          <div>
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
          confirmButtonText: "Cash Booking",
          cancelButtonText: "Cancel",
          showDenyButton: true,
          denyButtonText: "Online Booking",
        }).then((result) => {
          if (result.isConfirmed) {
            placeOrder(bookingDetails, "Cash");
          } else if (result.isDenied) {
            showRazorpay(roomData._id, bookingDetails);
          }
        });
      }
    }
  };
  const showRazorpay = async (roomId, bookingDetails) => {
    try {
      const orderUrl = await axios.post(`${baseRoute}/verifybooking/${roomId}`);
      const { data } = orderUrl;

      const options = {
        key: `${RAZORPAY_KEY}`,
        amount: bookingDetails.totalAmounttoPay * 100,
        currency: data.currency,
        name: "FindMyHome",
        description: "Test booking",
        image: logo,
        order_id: data.id,
        handler: async () => {
          try {
            const result = await axios.post(
              `${baseRoute}/placeorder`,
              bookingDetails
            );
            console.log(result);
            Swal.fire({
              title: "Room Booked Successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
            setTimeout(() => {
              navigate("/home");
            }, 2000);
          } catch (err) {
            console.log("Error in verify order", err);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error in fetching order URL:", error);
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
    <>
      <TopBar />
      <div className="container mx-auto mt-6 px-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">
              Room Details
            </h2>
          </div>

          <div className="p-6">
            {roomData ? (
              <div className="flex items-center justify-around mb-6">
                <div className="w-2/4 h-64">
                  <Slider
                    dots
                    infinite
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                  >
                    {roomData.images.map((image, index) => (
                      <img
                        key={index}
                        src={`${image}`}
                        alt={`Room Image ${index}`}
                        className="w-28 h-72 object-contain rounded-lg"
                      />
                    ))}
                  </Slider>
                </div>

                <div className="flex flex-col ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {roomData.roomType}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    The room data description encapsulates the essence of a
                    deluxe accommodation, promising a lavish and comfortable
                    stay. Boasting modern aesthetics and top-notch amenities,
                    this room is meticulously designed to provide guests with a
                    truly indulgent experience. Its spacious layout, adorned
                    with premium furnishings and equipped with conveniences like
                    a king-size bed, flat-screen TV, high-speed Wi-Fi, and a
                    dedicated workspace, ensures both relaxation and
                    productivity. The panoramic city view from floor-to-ceiling
                    windows adds a touch of sophistication, while the ensuite
                    bathroom with a rain shower and luxury bath amenities
                    elevates the comfort level. Whether for business or leisure,
                    this room caters to every need, offering a blend of
                    convenience, style, and luxury that promises a memorable
                    stay for discerning travelers.
                  </p>
                  <p className="text-gray-600 mb-2">
                    Price: ${roomData.amount} per night
                  </p>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={() => handleBookNow(roomData._id)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}

            <div className="border-t border-gray-300 pt-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Facilities
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {facilitiesData.map((facility, index) => (
                  <div key={index} className="flex items-center">
                    <facility.icon className="text-blue-500 mr-2" />
                    <span className="text-gray-600">{facility.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="mt-6" />
    </>
  );
};

export default FullDetails;
