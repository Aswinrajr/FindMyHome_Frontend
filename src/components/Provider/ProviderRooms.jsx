import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { axiosInstance } from "../../api/axios";

const ProviderRooms = () => {
  let token = localStorage.getItem("providerAccessToken");

  const newToken = JSON.parse(token);
  token = newToken?.providerAccessToken;
  console.log("Welcome to get provider rooms---------", token);

  const [rooms, setRooms] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get(
          `/provider/rooms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRooms(response.data);
        console.log("response.data", response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-4">Provider Rooms</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        onClick={() => navigate("/provider/rooms/addrooms")}
      >
        Add Rooms
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <Slider {...settings}>
              {room.images.map((image, index) => (
                <img
                  key={index}
                  src={`${image}`}
                  alt={room.roomType}
                  className="w-full h-40 object-contain"
                />
              ))}
            </Slider>
            <div className="p-4">
              <h2 className="text-lg font-semibold">
                Room Type: {room.roomType}
              </h2>
              <p className="text-gray-600">Adults: {room.adults}</p>
              <p className="text-gray-600">Children: {room.children}</p>
              <p className="text-gray-600">Amount: ₹{room.amount}</p>
              <p className="text-gray-600">
                Amenities:
                {Object.entries(room.amenities).map(
                  ([amenity, value]) =>
                    value && <span key={amenity}>{amenity}, </span>
                )}
              </p>
            </div>
            <div className="p-4 flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded shadow mr-2 hover:bg-blue-600"
                onClick={() =>
                  navigate(`/provider/rooms/editrooms/${room._id}`)
                }
              >
                Edit
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
                onClick={() => navigate(`/provider/rooms/${room._id}`)}
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderRooms;
