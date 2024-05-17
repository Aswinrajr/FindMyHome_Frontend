import { useEffect, useState } from "react";
import userImage from "../../assets/profile_demo.avif";
import { useNavigate } from "react-router";
import { getAllbookingData } from "../../service/Provider/LoginService";

const BookingPageProvider = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("asc");
  const bookingsPerPage = 3;

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await getAllbookingData();
        if (response && response.data && response.data.orders) {
          setBookings(response.data.orders);
          setFilteredBookings(response.data.orders);
        } else {
          console.error("Invalid data format in response:", response);
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    fetchBookingData();
  }, []);

  const handleSort = (type) => {
    const sortedBookings = filteredBookings.slice().sort((a, b) => {
      return type === "high"
        ? b.totalAmounttoPay - a.totalAmounttoPay
        : a.totalAmounttoPay - b.totalAmounttoPay;
    });
    setFilteredBookings(sortedBookings);
    setSortBy(type);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = bookings.filter((booking) =>
      booking.user.userName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBookings(filtered);
    setCurrentPage(1);
  };

  const handleViewMore = async (id) => {
    console.log(id);
    navigate("/provider/singlebookingdetails", { state: { id: id } });
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by User Name..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md px-3 py-2 w-72 focus:outline-none focus:border-blue-500"
        />
        <div className="flex items-center">
          <div className="flex space-x-2 mr-4">
            <button
              onClick={() => handleSort("high")}
              className={`bg-gray-500 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded ${
                sortBy === "high" ? "bg-pink-500" : ""
              }`}
            >
              High to Low
            </button>
            <button
              onClick={() => handleSort("low")}
              className={`bg-gray-500 hover:pink-gray-700 text-white font-semibold py-2 px-4 rounded ${
                sortBy === "low" ? "bg-pink-500" : ""
              }`}
            >
              Low to High
            </button>
          </div>
          <div className="flex items-center space-x-2">
            {Array.from(
              { length: Math.ceil(filteredBookings.length / bookingsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-2 rounded-md focus:outline-none ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left font-semibold">User Image</th>
            <th className="px-6 py-3 text-left font-semibold">User Name</th>
            <th className="px-6 py-3 text-left font-semibold">
              Provider Image
            </th>
            <th className="px-6 py-3 text-left font-semibold">Provider Name</th>
            <th className="px-6 py-3 text-left font-semibold">Address</th>
            <th className="px-6 py-3 text-left font-semibold">Status</th>
            <th className="px-6 py-3 text-left font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentBookings.map((booking) => (
            <tr key={booking._id} className="hover:bg-gray-100">
              <td className="px-6 py-4">
                <img
                  src={booking.image[0]}
                  alt={booking.user?.name || "User Image"}
                  className="h-10 w-10 rounded-full"
                />
              </td>
              <td className="px-6 py-4">{booking.user?.userName || "N/A"}</td>
              <td className="px-6 py-4">
                <img
                  src={booking?.provider?.providerImage[0] || userImage}
                  alt={booking.provider?.name || "Provider Image"}
                  className="h-10 w-10 rounded-full"
                />
              </td>
              <td className="px-6 py-4">
                {booking.provider?.providerName || "N/A"}
              </td>
              <td className="px-6 py-4">
                {booking.provider?.ProviderCity || "N/A"}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    booking.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.status || "N/A"}
                </span>
              </td>
              <td className="px-6 py-4">{booking.totalAmounttoPay || "N/A"}</td>
              <td
                className="px-6 py-4 text-blue-500 underline cursor-pointer"
                onClick={() => handleViewMore(booking._id)}
              >
                View more
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingPageProvider;
