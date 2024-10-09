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

  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 4;

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

        setRooms(response);
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <button
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out mb-4 sm:mb-0 text-sm font-semibold uppercase tracking-wider"
          onClick={() => navigate("/provider/rooms/addrooms")}
        >
          Add New Room
        </button>

        <div className="flex items-center space-x-4">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left mr-2"></i>Prev
          </button>

          <span className="text-gray-600 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next<i className="fas fa-chevron-right ml-2"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {currentRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          >
            <Slider {...settings}>
              {room.images?.map((image, index) => (
                <div key={index} className="aspect-w-16 aspect-h-9">
                  <img
                    src={`${image}`}
                    alt={room.roomType}
                    className="w-80 h-60 object-contain"
                  />
                </div>
              ))}
            </Slider>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {room.roomType}
              </h2>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <i className="fas fa-user-friends text-gray-500 mr-2"></i>
                  <span className="text-gray-600">{room.adults} Adults</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-child text-gray-500 mr-2"></i>
                  <span className="text-gray-600">
                    {room.children} Children
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-3xl font-bold text-blue-600">
                  ₹{room.amount}
                </p>
                <p className="text-sm text-gray-500">per night</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Amenities:
                </h3>
                <div className="flex flex-wrap">
                  {Object.entries(room.amenities).map(
                    ([amenity, value]) =>
                      value && (
                        <span
                          key={amenity}
                          className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full"
                        >
                          {amenity}
                        </span>
                      )
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out text-sm font-semibold uppercase tracking-wider"
                onClick={() =>
                  navigate(`/provider/rooms/editrooms/${room._id}`)
                }
              >
                Edit Room
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderRooms;
