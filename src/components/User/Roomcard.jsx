import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import {
  bookRoom,
  continueWithWallet,
  getFilteredRoomData,
  getSearchedRoomData,
  placeBookingOrder,
  saveToCart,
  verifyBookings,
} from "../../service/User/UserService";
import { toast, Toaster } from "react-hot-toast";

const Roomcard = ({ filteredDatas }) => {
  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [roomData, setRoomData] = useState([]);
  const [getRoomData, setGetRoomData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPageData, setCurrentPageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem("userAccessToken");
  const itemsPerPage = 4;
  const totalPages = Math.ceil(roomData.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSearchedRoomData(data);
        if (response.status === 200) {
          setRoomData(response.data);
          setGetRoomData(response.data);
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
    const fetchFilteredData = async () => {
      if (filteredDatas) {
        try {
          const response = await getFilteredRoomData(
            filteredDatas,
            getRoomData
          );
          if (response.status === 200) {
            setRoomData(response.data);
          }
        } catch (error) {
          console.error("Error fetching filtered room data:", error);
        }
      }
    };
    fetchFilteredData();
  }, [filteredDatas]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = roomData.slice(startIndex, endIndex);
    setCurrentPageData(slicedData);
  }, [currentPage, roomData]);

  useEffect(() => {
    const handleSearch = () => {
      if (searchTerm.trim() !== "") {
        const searchData = roomData.filter((item) =>
          item.room.roomType.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCurrentPageData(searchData.slice(0, itemsPerPage));
        setCurrentPage(1);
      } else {
        setCurrentPageData(roomData.slice(0, itemsPerPage));
      }
    };
    handleSearch();
  }, [searchTerm, roomData]);

  const handleBook = async (roomId) => {
    const newData = { data };

    try {
      const response = await bookRoom(newData, roomId);
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
            Swal.fire({
              title: "Do you want to pay with your wallet amount?",
              icon: "info",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "No, Continue..",
              denyButtonText: `Yes Proceed`,
            }).then((result) => {
              if (result.isConfirmed) {
                placeOrder(bookingDetails, "Cash");
              } else if (result.isDenied) {
                const walletPayment = async () => {
                  const response = await continueWithWallet(
                    bookingDetails,
                    "wallet payment"
                  );
                  try {
                    if (response.status === 200) {
                      Swal.fire("Room Booked successfully", "", "success");
                      setTimeout(() => {
                        navigate("/successpage", {
                          state: {
                            data: response.data.order,
                            adress: response.data.adress,
                          },
                        });
                      }, 1500);
                    }
                  } catch (err) {
                    console.log("Error in wallet payments", err);
                    Swal.fire("Insufficient funds in wallet", "", "error");
                  }
                };

                walletPayment();
              }
            });
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
      razorpay.open();

      razorpay.on("payment.failed", async function (response) {
        try {
          if (response) {
            const newResponse = await saveToCart(bookingDetails);
            if (newResponse && newResponse.status === 200) {
              toast.error("Payment failed !! Details added to cart");
              setTimeout(() => {
                razorpay.close();
                navigate("/failurepage", { state: { data: bookingDetails } });
              }, 1500);
            } else {
              throw new Error(
                "Error saving              to cart or invalid response."
              );
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

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by room type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-auto py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 sm:mb-0"
        />
        <div className="pagination flex items-center space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <span className="bg-gray-100 text-gray-700 font-semibold py-2 px-4">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      {currentPageData?.map((item, index) => (
        <div
          key={index}
          className="room-card bg-white shadow-md p-4 rounded-lg mb-4 flex flex-col md:flex-row"
        >
          <div className="w-full md:w-1/2 pr-4">
            <Slider {...settings}>
              {item.room.images.map((image, imageIndex) => (
                <div key={imageIndex}>
                  <img
                    onClick={() => navigate(`roompreview/${item.room._id}`)}
                    src={`${image}`}
                    alt={`Room ${index} Image ${imageIndex}`}
                    className="w-full h-48 object-contain rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <div className="flex flex-col h-full">
              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-5">
                <h3 className="text-xl font-semibold mb-2">
                  {item.room.roomType}
                </h3>
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
