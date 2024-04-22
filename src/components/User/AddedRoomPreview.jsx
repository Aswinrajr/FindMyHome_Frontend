import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaWifi, FaTv, FaSnowflake, FaUtensils, FaBath } from "react-icons/fa";
import { useParams } from "react-router";
import { roomViewPage } from "../../service/User/UserService";

const facilitiesData = [
  { icon: FaWifi, text: "Free Wi-Fi" },
  { icon: FaTv, text: "Flat-screen TV" },
  { icon: FaSnowflake, text: "Air conditioning" },
  { icon: FaUtensils, text: "Mini fridge" },
  { icon: FaBath, text: "Private bathroom" },
];

const AddedRoomPreview = () => {
  const [roomData, setRoomData] = useState(null);
  const {id} = useParams()
  console.log(id)

  useEffect(() => {
    const fetchData = async()=>{
        const response = await roomViewPage(id)
        console.log(response)
        setRoomData(response.data);
    }
    fetchData()
  }, []);

  if (!roomData) return <p>Loading...</p>;

  return (
    <>
      <div className="container mx-auto mt-6 px-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">
              Room Details
            </h2>
          </div>

          <div className="p-6">
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
                      src={image}
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
                <p className="text-red-600 mb-2">
                  Address: <span className="text-pink-600">{roomData.status}</span>
                </p>
                <p className="text-gray-600 mb-2">
                  The room data description encapsulates the essence of a deluxe
                  accommodation, promising a lavish and comfortable stay.
                  Boasting modern aesthetics and top-notch amenities, this room
                  is meticulously designed to provide guests with a truly
                  indulgent experience. Its spacious layout, adorned with
                  premium furnishings and equipped with conveniences like a
                  king-size bed, flat-screen TV, high-speed Wi-Fi, and a
                  dedicated workspace, ensures both relaxation and productivity.
                  The panoramic city view from floor-to-ceiling windows adds a
                  touch of sophistication, while the ensuite bathroom with a
                  rain shower and luxury bath amenities elevates the comfort
                  level. Whether for business or leisure, this room caters to
                  every need, offering a blend of convenience, style, and luxury
                  that promises a memorable stay for discerning travelers.
                </p>
                <p className="text-gray-600 mb-2">
                  Price: ₹{roomData.amount} per night
                </p>
              </div>
            </div>

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
    </>
  );
};

export default AddedRoomPreview;
