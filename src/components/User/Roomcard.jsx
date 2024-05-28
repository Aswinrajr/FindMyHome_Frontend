import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Slider from "react-slick";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import {
  bookRoom,
  getSearchedRoomData,
  placeBookingOrder,
  saveToCart,
  verifyBookings,
} from "../../service/User/UserService";
import { toast, Toaster } from "react-hot-toast";

const Roomcard = ({ filteredDatas }) => {
  console.log("filteredDatas on room cardc", filteredDatas);

  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [roomData, setRoomData] = useState([]);
  const [newRoomData, setNewRoomData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("userAccessToken");

  console.log("======>", roomData);

  useEffect(() => {
    console.log("Calling");
    const fetchData = async () => {
      try {
        const response = await getSearchedRoomData(data);
        // console.log("Response in searched rooms", response);

        if (response.status === 200) {
          setRoomData(response.data);
          setNewRoomData(response.data);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    if (!token) {
      Swal.fire({
        title: "User is not logged in. Please login.",
        icon: "error",
        confirmButtonText: "OK",
      });
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    if (filteredDatas?.length > 0) {
      const getFilterData = roomData?.filter((item) => {
        const roomType = item && item.room && item.room.roomType;
        if (typeof filteredDatas === "string" && roomType) {
          return roomType.toLowerCase() === filteredDatas?.toLowerCase();
        } else {
          console.log(
            "Invalid filtered data or missing room type in item:",
            item
          );
          return false;
        }
      });
      setRoomData(getFilterData);
    }

    if (filteredDatas === "high_to_low") {
      const sortedHighToLow = roomData
        ?.slice()
        .sort((a, b) => b.room.amount - a.room.amount);
      console.log(sortedHighToLow);
      setRoomData(sortedHighToLow);
    }
    if (filteredDatas === "low_to_high") {
      const sortedLowToHigh = roomData
        ?.slice()
        .sort((a, b) => a.room.amount - b.room.amount);
      console.log(sortedLowToHigh);
      setRoomData(sortedLowToHigh);
    }
    if (["1", "2", "3", "4", "5"].includes(filteredDatas)) {
      const star = parseInt(filteredDatas);
      console.log("Star Rating:", star);

      const filteredReviewRooms = newRoomData.filter((room) => {
        console.log("Rooms", room);
        const reviews = room.room.reviews;
        console.log("Reviews", reviews);

        const totalRatings = reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const averageRating = Math.floor(totalRatings / reviews.length);

        return averageRating === star;
      });
      console.log("Filtered review rooms", filteredReviewRooms);
      setRoomData(filteredReviewRooms);

      console.log("Rooms with average and star rating equal to", star);
    }

    if (filteredDatas === "clear") {
      setRoomData(newRoomData);
    }
  }, [filteredDatas, newRoomData, roomData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = roomData?.filter((item) =>
    item.room.roomType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleBook = async (roomId) => {
    const newData = {
      data,
    };

    try {
      const response = await bookRoom(newData, roomId);
      if (response.status === 200) {
        const bookingDetails = response.data.bookingDetails;

        const htmlContent = `
        <div class="bg-white rounded-lg shadow-md p-6 flex flex-col items-center gap-4">
        <h3 class="text-lg font-bold text-gray-800">Booking Summary</h3>
      
        <div class="flex flex-col gap-2">
          <span class="font-medium text-gray-700">Room Type:</span>
          <span class="text-gray-600">${bookingDetails.roomType}</span>
        </div>
      
        <div class="flex flex-col gap-2">
          <span class="font-medium text-gray-700">Guests:</span>
          <span class="text-gray-600">Adults: ${bookingDetails.adults}, Children: ${bookingDetails.children}</span>
        </div>
      
        <div class="flex flex-col gap-2">
          <span class="font-medium text-gray-700">Stay:</span>
          <span class="text-gray-600">Number of Days: ${bookingDetails.numberOfDays}</span>
        </div>
      
        <div class="flex flex-col gap-2">
          <span class="font-medium text-gray-700">Dates:</span>
          <div class="flex flex-wrap gap-2">
            <span class="text-gray-600">Check-in: ${bookingDetails.checkInDate}</span>
            <span class="text-gray-600">Check-out: ${bookingDetails.checkOutDate}</span>
          </div>
        </div>
      
        <div class="flex justify-between items-center gap-4">
          <span class="font-medium text-gray-700">Amount:</span>
          <span class="text-teal-500 font-medium">${bookingDetails.amount}</span>
        </div>
      
        <div class="flex justify-between items-center gap-4 text-red-500 font-medium">
          <span>Total Amount to Pay:</span>
          <span>${bookingDetails.totalAmounttoPay}</span>
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
            showRazorpay(roomId, bookingDetails);
          }
        });
      }
    } catch (error) {
      console.error("Error in booking:", error);
    }
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

            console.log("cash", result);
            Swal.fire({
              title: "Room Booked Successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
            setTimeout(() => {
              navigate("/successpage", {
                state: { data: bookingDetails, adress: "" },
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
      console.log("Razorpay open", razorpay);
      razorpay.open();

      razorpay.on("payment.failed", async function (response) {
        try {
          console.log("Error Response:", response);
          if (response) {
            console.log("Inside payment failed handler", bookingDetails);
            const newResponse = await saveToCart(bookingDetails);
            console.log("Response from saveToCart:", newResponse);
            if (newResponse && newResponse.status === 200) {
              toast.error("Payment failed !! Details added to cart");
              setTimeout(() => {
                razorpay.close();

                navigate("/failurepage", { state: { data: bookingDetails } });
              }, 1500);
            } else {
              throw new Error("Error saving to cart or invalid response.");
            }
          }
        } catch (error) {
          console.error("Error handling payment failure:", error);
          razorpay.close();
        }
      });
    } catch (error) {
      console.error("Error in fetching order URL:", error);
    }
  };
  const placeOrder = async (bookingDetails) => {
    try {
      const mode = "by cash";
      const orderResponse = await placeBookingOrder(bookingDetails, mode);

      console.log("Order placed:", orderResponse.data);
      Swal.fire({
        title: "Room Booked Successfully",
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="room-cards-container">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by room type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-auto py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="pagination flex items-center space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-md transition duration-300 ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            Prev
          </button>

          {Array.from(
            { length: Math.ceil(filteredData.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-md transition duration-300 ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(filteredData.length / itemsPerPage)
            }
            className={`px-3 py-2 rounded-md transition duration-300 ${
              currentPage === Math.ceil(filteredData.length / itemsPerPage)
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
      {currentItems.map((item, index) => (
        <div
          key={index}
          className="room-card bg-white shadow-md p-8 rounded-lg mb-4 flex flex-col md:flex-row"
        >
          <div className="w-full md:w-1/2 pr-4">
            <Slider {...settings}>
              {item.room.images.map((image, imageIndex) => (
                <div key={imageIndex}>
                  <img
                    onClick={() => navigate(`roompreview/${item.room._id}`)}
                    src={`${image}`}
                    alt={`Room ${index} Image ${imageIndex}`}
                    className="w-full h-48 mb-8 object-contain rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex flex-col h-full">
              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-5">
                <h3 className="text-xl font-semibold mb-2">
                  {item.room.roomType}
                </h3>
                {/* <p className="text-lg text-black mb-2">
                  Amount: ₹{item.room.amount}
                </p> */}

                {item?.offerAmount > 100 ? (
                  <div className="flex items-center mb-2">
                    <p className="text-lg font-semibold text-gray-800">
                      Amount:
                    </p>
                    <div className="ml-2 flex items-center">
                      <span className="text-lg text-gray-500 line-through">
                        ₹{item.room.amount}
                      </span>
                      <span className="text-xl font-bold text-green-600 ml-2">
                        ₹{item.room.amount - item.offerAmount}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    Amount: ₹{item.room.amount}
                  </p>
                )}

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm">Adults: {item.room.adults}</span>
                  <span className="text-sm">
                    Children: {item.room.children}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Away from: {item.distance.toFixed(2)} KM
                </p>
              </div>

              <button
                onClick={() => handleBook(item.room._id)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded mt-auto transition duration-300 focus:outline-none"
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
