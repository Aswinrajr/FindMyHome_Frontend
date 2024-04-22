import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Slider from "react-slick";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import { bookRoom, getSearchedRoomData, placeBookingOrder, verifyBookings } from "../../service/User/UserService";

const Roomcard = ({ filteredDatas }) => {
  console.log("filteredDatas on room cardc", filteredDatas);


  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [roomData, setRoomData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("userAccessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSearchedRoomData(data);

        if (response.status === 200) {
          setRoomData(response.data);
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
    if (filteredDatas.length > 0) {
      const getFilterData = roomData?.filter((item) => {
        const roomType = item && item.room && item.room.roomType;
        if (typeof filteredDatas === "string" && roomType) {
          return roomType.toLowerCase() === filteredDatas.toLowerCase();
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
  }, [filteredDatas, roomData]);

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
      const orderUrl = await verifyBookings(roomId)
      console.log("PrderUrl",orderUrl)
      
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
            const mode = "by Online"
            const result = await placeBookingOrder(bookingDetails,mode)
      
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
      const mode = "by cash"
      const orderResponse = await placeBookingOrder(bookingDetails,mode)
      
   
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="room-cards-container">
      <input
        type="text"
        placeholder="Search by room type..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
      />

      {currentItems.map((item, index) => (
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
                    className="w-full h-48 mb-4 object-contain rounded-lg"
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
      <div className="pagination flex justify-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mr-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white`}
        >
          Prev
        </button>
        {filteredData.length > itemsPerPage &&
          Array.from(
            { length: Math.ceil(filteredData.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-2 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
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
          className={`px-4 py-2 ml-2 rounded-lg ${
            currentPage === Math.ceil(filteredData.length / itemsPerPage)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Roomcard;
