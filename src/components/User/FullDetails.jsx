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
import { toast, Toaster } from "react-hot-toast";

import {
  bookRoomPage,
  roomViewPage,
  saveToCart,
} from "../../service/User/UserService";

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
  const [discountamount, setDiscountAmount] = useState(0);
  const user = localStorage.getItem("userAccessToken");

  const newToken = JSON.parse(user);
  const token = newToken?.userAccessToken;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await roomViewPage(id);

        setRoomData(response.data.roomData);
        setDiscountAmount(response.data.amount);
      
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    fetchData();
  }, [baseRoute, id]);

  const handleBookNow = async (roomid) => {
    const { value: formValues } = await Swal.fire({
      title: "Enter Booking Details",
      html: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="checkInDate" class="block text-gray-700 font-semibold mb-1">Check-in Date</label>
            <input id="checkInDate" class="swal2-input form-input w-2/4 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" type="date" placeholder="Check-in Date" required>
          </div>
          <div>
            <label for="checkOutDate" class="block text-gray-700 font-semibold mb-1">Check-out Date</label>
            <input id="checkOutDate" class="swal2-input form-input w-2/4 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" type="date" placeholder="Check-out Date" required>
          </div>
          <div>
            <label for="adults" class="block text-gray-700 font-semibold mb-1">Number of Adults</label>
            <input id="adults" class="swal2-input form-input w-2/4 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" type="number" placeholder="Number of Adults" min="1" required>
          </div>
          <div>
            <label for="children" class="block text-gray-700 font-semibold mb-1">Number of Children</label>
            <input id="children" class="swal2-input form-input w-2/4 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" type="number" placeholder="Number of Children" min="0" required>
          </div>
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const children = document.getElementById("children").value;
        if (!children) {
          Swal.showValidationMessage("All fields are required.");
          return false;
        }
        const currentDate = new Date().toISOString().split("T")[0];
        const checkInDate = new Date(
          document.getElementById("checkInDate")?.value
        )
          .toISOString()
          .split("T")[0];
        const checkOutDate = new Date(
          document.getElementById("checkOutDate")?.value
        )
          .toISOString()
          .split("T")[0];
        const adults = document.getElementById("adults").value;

        if (parseInt(adults) < 1) {
          Swal.showValidationMessage("Number of adults cannot be less than 1.");
          return false;
        }
        if (parseInt(children) < 0) {
          Swal.showValidationMessage(
            "Number of children cannot be less than 0."
          );
          return false;
        }

        const checkInDateTime = new Date(checkInDate).getTime();
        const checkOutDateTime = new Date(checkOutDate).getTime();

        if (
          checkInDateTime < new Date(currentDate).getTime() ||
          checkOutDateTime < new Date(currentDate).getTime()
        ) {
          Swal.showValidationMessage(
            "Check-in and check-out dates cannot be before today's date."
          );
          return false;
        }
        if (checkOutDateTime <= checkInDateTime) {
          Swal.showValidationMessage(
            "Check-out date must be after check-in date."
          );
          return false;
        }

        return { checkInDate, checkOutDate, adults, children };
      },
      confirmButtonText: "Book Now",
      confirmButtonColor: "#4f46e5",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#d1d5db",
      customClass: {
        container: "swal2-container",
        popup: "swal2-popup rounded-lg",
        title: "swal2-title text-2xl font-semibold mb-4",
        htmlContainer: "swal2-html-container",
        content: "swal2-content",
        confirmButton:
          "swal2-confirm-button px-6 py-3 rounded-md font-semibold",
        cancelButton: "swal2-cancel-button px-6 py-3 rounded-md font-semibold",
      },
      width: "70%",
      maxWidth: "800px",
    });

    if (formValues) {
      const data = {
        formData: formValues,
        user,
      };
      console.log("Data==>", data);

      const response = await bookRoomPage(roomData._id, data);

      console.log("==>", response);
      if (response.status === 200) {
        const bookingDetails = response.data.bookingDetails;

        const htmlContent = `
         <div class="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">

  
  <div class="space-y-6">
    <div class="flex justify-between items-center border-b pb-4">
      <span class="text-gray-600">Room Type</span>
      <span class="font-semibold text-gray-800">${bookingDetails.roomType}</span>
    </div>

    <div class="flex justify-between items-center">
      <span class="text-gray-600">Guests</span>
      <div>
        <span class="font-semibold text-gray-800">${bookingDetails.adults} Adults</span>
       
          <span class="font-semibold text-gray-800 ml-2">${bookingDetails.children} Children</span>
      
      </div>
    </div>

    <div class="flex justify-between items-center border-b pb-4">
      <span class="text-gray-600">Length of Stay</span>
      <span class="font-semibold text-gray-800">${bookingDetails.numberOfDays} nights</span>
    </div>

    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Check-in</span>
        <span class="font-semibold text-gray-800">${bookingDetails.checkInDate}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Check-out</span>
        <span class="font-semibold text-gray-800">${bookingDetails.checkOutDate}</span>
      </div>
    </div>

    <div class="border-t pt-4 mt-6">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Room Rate (per night)</span>
        <span class="font-semibold text-gray-800">₹${bookingDetails.amount}</span>
      </div>
      <div class="flex justify-between items-center mt-4">
        <span class="text-lg font-semibold text-gray-800">Total Amount to pay</span>
        <span class="text-2xl font-bold text-green-600">₹${bookingDetails.totalAmounttoPay}</span>
      </div>
    </div>
  </div>
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
            console.log("denied", bookingDetails);
            showRazorpay(roomData._id, bookingDetails);
          }
        });
      }
    }
  };
  const showRazorpay = async (roomId, bookingDetails) => {
    try {
 
      const orderUrl = await axios.post(
        `${baseRoute}/verifybooking/${roomId}`,
        { bookingDetails },
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
              bookingDetails,
              {
                headers: {
                  "Cache-Control": "no-cache, no-store, must-revalidate",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(result);
            Swal.fire({
              title: "Room Booked Successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
            setTimeout(() => {
              navigate("/successpage", {
                state: {
                  data: result?.data?.order,
                  adress: result?.data?.adress,
                },
              });
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

      razorpay.on("payment.failed", async function (response) {
        try {
          console.log("Error Response:", response);
          if (response) {
            console.log("Inside payment failed handler", bookingDetails);
            const newResponse = await saveToCart(bookingDetails);
            console.log("Response from saveToCart:", newResponse);
            if (newResponse && newResponse.status === 200) {
              razorpay.close();
              toast.error("Payment failed !! Details added to cart");
              setTimeout(() => {
                navigate("/failurepage", {
                  state: {
                    data: bookingDetails,
                    adress: newResponse.data.adress,
                  },
                });
              }, 1500);
            } else {
              throw new Error("Error saving to cart or invalid response.");
            }
          }
        } catch (error) {
          console.error("Error handling payment failure:", error);
        }
      });
    } catch (error) {
      console.error("Error in fetching order URL:", error);
    }
  };

  const placeOrder = async (bookingDetails) => {
    try {
      const orderResponse = await axios.post(
        `${baseRoute}/placeorder`,
        bookingDetails,
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      Swal.fire({
        title: "Room Booked Successfully, Booking details is sent to mail Id",
        icon: "success",
        confirmButtonText: "OK",
      });
      setTimeout(() => {
        navigate("/successpage", {
          state: {
            data: orderResponse.data.order,
            adress: orderResponse.data.adress,
          },
        });
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  const StarRating = ({ rating }) => {
    console.log("Current", rating);
    const stars = [];

    const ratingValue = rating;

    for (let i = 1; i <= 5; i++) {
      const starClass =
        i <= ratingValue
          ? "fas fa-star text-yellow-500"
          : "fas fa-star text-gray-300";
      stars.push(<i key={i} className={starClass} />);
    }
    return <div className="flex items-center">{stars}</div>;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <div className="container mx-auto mt-6 px-4 flex-grow">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">
              Room Details
            </h2>
          </div>

          <div className="p-6">
            {roomData ? (
              <div className="flex flex-col lg:flex-row items-center justify-around mb-6">
                <div className="w-full lg:w-2/4 h-64">
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
                        className="w-full h-64 object-contain rounded-lg"
                      />
                    ))}
                  </Slider>
                </div>

                <div className="flex flex-col mt-4 lg:mt-0 lg:ml-4">
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

                  {discountamount > 100 ? (
                    <div className="flex items-center mb-2">
                      <p className="text-lg font-semibold text-gray-800">
                        Amount:
                      </p>
                      <div className="ml-2 flex items-center">
                        <span className="text-lg text-gray-500 line-through">
                          ₹{roomData.amount}
                        </span>
                        <span className="text-xl font-bold text-green-600 ml-2">
                          ₹{roomData.amount - discountamount}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-lg font-semibold text-gray-800 mb-2">
                      Amount: ₹{roomData.amount}
                    </p>
                  )}
                  <p className="text-gray-900 mb-2">
                    Address: {roomData.status}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {facilitiesData.map((facility, index) => (
                  <div key={index} className="flex items-center">
                    <facility.icon className="text-blue-500 mr-2" />
                    <span className="text-gray-600">{facility.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Review List</h3>
              {roomData?.reviews?.map((review) => (
                <div
                  key={review._id}
                  className="bg-white shadow-md rounded-md p-4 mb-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-bold">
                      {review?.userName ? review.userName : "You"}
                    </h5>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-gray-700">{review.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FullDetails;
