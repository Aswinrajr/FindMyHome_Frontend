import image from "../../assets/2.jpeg"; 

const FullDetails = () => {
  const room = {
    id: 1,
    roomType: "Standard Room",
    image: image, 
    facilities: ["Wi-Fi", "TV", "Air Conditioning"],
    amount: 1000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut magna ullamcorper, vehicula ante id, tempus augue.",
    address: "123 Example Street, City, Country",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <img
            src={room.image}
            alt={room.roomType}
            className="w-full h-64 object-cover rounded-lg mb-4 md:mb-0" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 opacity-25 hover:opacity-75"></div> 
        </div>
        <div className="md:pl-4">
          <h2 className="text-xl font-bold mb-2">{room.roomType}</h2>
          <p className="text-gray-600 mb-2">Address: {room.address}</p>
          <p className="text-gray-600 mb-2">Facilities: {room.facilities.join(", ")}</p>
          <p className="text-red-500 font-bold text-lg mb-4">Amount: ₹{room.amount}</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Book Now
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p>{room.description}</p>
      </div>
    </div>
  );
};

export default FullDetails;
