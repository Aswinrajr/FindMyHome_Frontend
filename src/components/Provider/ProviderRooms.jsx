import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { getRoomData } from "../../service/Provider/LoginService";

const ProviderRooms = () => {
  let token = localStorage.getItem("providerAccessToken");

  const newToken = JSON.parse(token);
  token = newToken?.providerAccessToken;
  console.log("Welcome to get provider rooms---------", token);

  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 3;

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
        const response = await getRoomData();
        console.log("=====>", response);

        setRooms(response);
        console.log("response.data", response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const navigate = useNavigate();

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={() => navigate("/provider/rooms/addrooms")}
        >
          Add Rooms
        </button>
        <div className="flex items-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 mr-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {currentRooms.map((room) => (
          <div
            key={room.id}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <Slider {...settings}>
              {room.images?.map((image, index) => (
                <img
                  key={index}
                  src={`${image}`}
                  alt={room.roomType}
                  className="w-full h-40 object-contain mt-4 mb-7"
                />
              ))}
            </Slider>
            <div className="p-4 mt-4">
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
                    value && <span key={amenity}>{amenity} </span>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderRooms;
