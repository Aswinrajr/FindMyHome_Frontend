import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getuserBookingDetails } from "../../service/User/UserService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../../components/Sample/Footer";
import UserReview from "./UserReview";
import TopBar from "../../components/Sample/TopBar";
import { FaBath, FaSnowflake, FaTv, FaUtensils, FaWifi } from "react-icons/fa";


const facilitiesData = [
    { icon: FaWifi, text: "Free Wi-Fi" },
    { icon: FaTv, text: "Flat-screen TV" },
    { icon: FaSnowflake, text: "Air conditioning" },
    { icon: FaUtensils, text: "Mini fridge" },
    { icon: FaBath, text: "Private bathroom" },
  ];



const BookingDetails = () => {
  const params = useParams();
  const [roomData, setRoomData] = useState({});
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getuserBookingDetails(params.id);
        setBookingData(response.data.bookingData);
        setRoomData(response.data.roomData);
       
      } catch (err) {
        console.log("Error in booking data", err);
      }
    };
    fetchData();
  }, [params.id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
    <TopBar />
    <div className="container mx-auto mt-6 px-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-200">
          <h2 className="text-3xl font-bold text-gray-800">Booking Details</h2>
        </div>
  
        <div className="p-6">
          <div className="flex items-start justify-between mb-8">
            <div className="w-2/5 h-64">
              <Slider
                dots
                infinite
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
              >
                {bookingData?.image?.map((image, index) => (
                  <img
                    key={index}
                    src={`${image}`}
                    alt={`Room Image ${index}`}
                    className="w-full h-72 object-cover rounded-lg"
                  />
                ))}
              </Slider>
            </div>
  
            <div className="w-3/5 ml-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {roomData.roomType}
              </h3>
              <p className="text-base font-normal text-gray-600 mb-6">
                The room data description encapsulates the essence of a deluxe
                accommodation, promising a lavish and comfortable stay. Boasting
                modern aesthetics and top-notch amenities, this room is
                meticulously designed to provide guests with a truly indulgent
                experience. Its spacious layout, adorned with premium furnishings
                and equipped with conveniences like a king-size bed, flat-screen
                TV, high-speed Wi-Fi, and a dedicated workspace, ensures both
                relaxation and productivity. The panoramic city view from
                floor-to-ceiling windows adds a touch of sophistication, while the
                ensuite bathroom with a rain shower and luxury bath amenities
                elevates the comfort level. Whether for business or leisure, this
                room caters to every need, offering a blend of convenience, style,
                and luxury that promises a memorable stay for discerning
                travelers.
              </p>
  
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xl font-semibold text-gray-800 mb-2">
                    Amount: ₹{roomData.amount}
                  </p>
                  <p className="text-xl font-semibold text-gray-800 mb-2">
                    Check in Date: {bookingData.checkInDate}
                  </p>
                  <p className="text-xl font-semibold text-gray-800 mb-2">
                    Check out Date: {bookingData.checkOutDate}
                  </p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-800 mb-2">
                    Booking Date: {bookingData.bookingDate}
                  </p>
                  <p className="text-xl font-semibold text-gray-800 mb-2">
                    Booking Address: {bookingData.Adress}
                  </p>
               
                  <p className="text-xl font-semibold text-gray-800 mb-2">
                    Status: {bookingData.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          <div className="border-t border-gray-300 pt-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Facilities
            </h4>
            <div className="grid grid-cols-3 gap-6">
              {facilitiesData?.map((facility, index) => (
                <div key={index} className="flex items-center">
                  <facility.icon className="text-blue-500 mr-2" />
                  <span className="text-base font-normal text-gray-600">
                    {facility.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <UserReview roomId={roomData._id}/>
      </div>
    </div>
    <Footer className="mt-6" />
  </>
  );
};

export default BookingDetails;
