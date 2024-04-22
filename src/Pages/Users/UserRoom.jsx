import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopBar from "../../components/Sample/TopBar";
import Footer from "../../components/Sample/Footer";
import { getUsersRoom } from "../../service/User/UserService";

const UserRoom = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL_ROUTE;
  const userEmail = localStorage.getItem("userAccessToken");
  const emailObject = JSON.parse(userEmail);
  const email = emailObject?.user;
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchRooms = async () => {
      if (!userEmail) {
        console.error("Email is not available.");
        return;
      }
      try {
        const response = await getUsersRoom()

      

        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [baseUrl, email]);
  if(!userEmail) return <Navigate to="/"/>

  return (
    <>
      <TopBar />
      <div className="flex flex-col min-h-screen mt-5">
        <div className="flex-grow">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-4">User Rooms</h1>
            <button
              className="bg-blue-500 w-80 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
              onClick={() => navigate("/addroom")}
            >
              Add Rooms
            </button>
            {loading ? (
              <p>Loading...</p>
            ) : rooms?.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-lg text-gray-500">No rooms available.</p>
              </div>
            ) : (
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
                          navigate(`/usereditroom/${room._id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
                        onClick={() => navigate(`/addedroompreview/${room._id}`)}
                      >
                        View More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserRoom;
