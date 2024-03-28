import TopBar from "../Sample/TopBar";
import Footer from "../Sample/Footer";
import { FaWifi, FaTv, FaSnowflake, FaUtensils, FaBath } from "react-icons/fa";

const facilitiesData = [
  { icon: FaWifi, text: "Free Wi-Fi" },
  { icon: FaTv, text: "Flat-screen TV" },
  { icon: FaSnowflake, text: "Air conditioning" },
  { icon: FaUtensils, text: "Mini fridge" },
  { icon: FaBath, text: "Private bathroom" },
];

const FullDetails = () => {
  return (
    <>
      <TopBar />
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
                <img
                  src="https://via.placeholder.com/200"
                  alt="Room"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="flex flex-col ml-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Deluxe Room
                </h3>
                <p className="text-gray-600 mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p className="text-gray-600 mb-2">Price: $150 per night</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                  Book Now
                </button>
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
      <Footer className="mt-6" />
    </>
  );
};

export default FullDetails;
