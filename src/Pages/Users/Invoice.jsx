

const Invoice = () => {
  const bookingDetails = {
    roomType: "Single",
    adults: 2,
    children: 2,
    numberOfDays: 1,
    checkInDate: "2024-05-23",
    checkOutDate: "2024-05-24",
    bookingDate: "2024-05-22",
    amount: 1700,
    totalAmounttoPay: 1700,
    city: "Thiruvathapuram",
    image: [
      "https://res.cloudinary.com/dl92xeqq8/image/upload/v1715687285/provider/qoelibkimpdeamgbukqf.jpg",
      "https://res.cloudinary.com/dl92xeqq8/image/upload/v1715687285/provider/aty43rlvwsb2ghxyrlo0.jpg",
      "https://res.cloudinary.com/dl92xeqq8/image/upload/v1715687285/provider/ttn9c9rzk2i9auegf2w6.jpg",
      "https://res.cloudinary.com/dl92xeqq8/image/upload/v1715687294/provider/lfnaquxlfwdyqkrx7lpz.jpg",
      "https://res.cloudinary.com/dl92xeqq8/image/upload/v1715748322/provider/dooazedoes89fwzclmql.jpg",
    ],
    status: "Booked",
    Adress: "1219-1, Ambady Nagar, Chavadimukku, Amadi Nagar, Sreekariyam, Thiruvananthapuram, Kerala 695017, India",
    __v: 0,
    paymentMethod: "by cash",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Booking Invoice</h2>
        <div className="text-gray-600">
          <span className="font-bold">Booking Date:</span> {bookingDetails.bookingDate}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Booking Details</h3>
          <div className="flex mb-2">
            <span className="font-bold w-32">Room Type:</span>
            <span>{bookingDetails.roomType}</span>
          </div>
          <div className="flex mb-2">
            <span className="font-bold w-32">Adults:</span>
            <span>{bookingDetails.adults}</span>
          </div>
          <div className="flex mb-2">
            <span className="font-bold w-32">Children:</span>
            <span>{bookingDetails.children}</span>
          </div>
          <div className="flex mb-2">
            <span className="font-bold w-32">Number of Days:</span>
            <span>{bookingDetails.numberOfDays}</span>
          </div>
          <div className="flex mb-2">
            <span className="font-bold w-32">Check-in Date:</span>
            <span>{bookingDetails.checkInDate}</span>
          </div>
          <div className="flex mb-2">
            <span className="font-bold w-32">Check-out Date:</span>
            <span>{bookingDetails.checkOutDate}</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
          <div className="flex mb-2">
            <span className="font-bold w-32">Amount:</span>
            <span>{bookingDetails.amount}</span>
          </div>
          <div className="flex mb-2">
            <span className="font-bold w-32">Total Amount:</span>
            <span>{bookingDetails.totalAmounttoPay}</span>
          </div>
          <div className="flex mb-2">
            <span className="font-bold w-32">Payment Method:</span>
            <span>{bookingDetails.paymentMethod}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Property Details</h3>
        <div className="flex mb-2">
          <span className="font-bold w-32">City:</span>
          <span>{bookingDetails.city}</span>
        </div>
        <div className="flex mb-2">
          <span className="font-bold w-32">Address:</span>
          <span>{bookingDetails.Adress}</span>
        </div>
        <div className="flex mb-2">
          <span className="font-bold w-32">Status:</span>
          <span>{bookingDetails.status}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Property Images</h3>
        <div className="flex flex-wrap -m-2">
          {bookingDetails.image.map((imgUrl, index) => (
            <div key={index} className="w-1/3 p-2">
              <img src={imgUrl} alt={`Room Image ${index + 1}`} className="w-full h-48 object-cover rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invoice;