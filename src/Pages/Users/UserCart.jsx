import { useEffect, useState } from "react";
import {
  getCartData,
  placeBookingOrder,
  verifyBookings,
} from "../../service/User/UserService";
import TopBar from "../../components/Sample/TopBar";
import Footer from "../../components/Sample/Footer";
import logo from "../../assets/logo.png";
import Swal from "sweetalert2";
import {  useNavigate } from "react-router";
import { toast, Toaster } from "react-hot-toast";

const UserCart = () => {


  const [demoData, setDemoData] = useState([]);
  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      const data = await getCartData();
      console.log("Data from API:", data.data.userCart.cart);
      setDemoData(data.data.userCart.cart);

      console.log(demoData)
    };
    fetchData();
  }, []);

  const handleContinuePayment = (data) => {
    console.log("Continue to payment", data);
    showRazorpay(data.roomId, data);
  };

  const showRazorpay = async (roomId, bookingDetails) => {
    try {
      const orderUrl = await verifyBookings(roomId);
      console.log("OrderUrl", orderUrl);

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
            const mode = "by Online";
            const result = await placeBookingOrder(bookingDetails, mode);

            console.log(result);
            Swal.fire({
              title: "Room Booked Successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
            setTimeout(() => {
              navigate("/successpage",{state:{data:bookingDetails}});
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
      console.log("Razorpay open", razorpay);
      razorpay.open();
    } catch (error) {
      console.error("Error in fetching order URL:", error);
    }
  };

  const handleCancel = () => {
    console.log("Cancel booking");
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <div className="max-w-6xl mx-auto py-12 flex-grow">
        <Toaster position="top-center" reverseOrder={false} />
        <h2 className="text-3xl font-bold text-gray-800 mb-7 text-center">
          Cart Details
        </h2>

        {demoData.length > 0 ? (
          demoData.map((booking, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
            >
              <div className="md:grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={booking.image[0]}
                    alt="Room"
                    className="w-2/3 h-full ml-9 object-contain"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {booking.roomType}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-semibold">Adults:</span>{" "}
                        {booking.adults}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Children:</span>{" "}
                        {booking.children}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Number of Days:</span>{" "}
                        {booking.numberOfDays}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Check-in Date:</span>{" "}
                        {formatDate(booking.checkInDate)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Check-out Date:</span>{" "}
                        {formatDate(booking.checkOutDate)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-semibold">Booking Date:</span>{" "}
                        {formatDate(booking.bookingDate)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Amount:</span> ₹
                        {booking.amount}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">
                          Total Amount to Pay:
                        </span>{" "}
                        ₹{booking.totalAmounttoPay}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">City:</span>{" "}
                        {booking.city}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Address:</span>{" "}
                        {booking.adress}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mr-4 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                      onClick={() => handleContinuePayment(booking)}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="min-h-screen flex flex-col mt-20 bg-white">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-center">
                <svg
                  className="h-12 w-12 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 text-center mb-8">
                Looks like you haven't added any items to your cart yet. Let's
                change that!
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer className="bg-gray-100 py-4 mt-auto" />
    </div>
  );
};

export default UserCart;
