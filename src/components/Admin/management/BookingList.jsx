import { useEffect, useState } from "react";
import userImage from "../../../assets/profile_demo.avif";
import { Navigate, useNavigate } from "react-router";
import { getBookingData } from "../../../service/Admin/ManagementService";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("asc");
  const bookingsPerPage = 3;

  let token = localStorage.getItem("accessToken");
  const newToken = JSON.parse(token);
  token = newToken?.accessToken;

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await getBookingData();
        setBookings(response.data.orders);
        setFilteredBookings(response.data.orders);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    fetchBookingData();
  }, []);

  if (!token) return <Navigate to="/admin" />;

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = bookings.filter((booking) =>
      booking.user.userName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBookings(filtered);
    setCurrentPage(1);
  };

  const handleSort = () => {
    const sorted = filteredBookings.slice().sort((a, b) => {
      if (sortBy === "asc") {
        return a.totalAmounttoPay - b.totalAmounttoPay;
      } else {
        return b.totalAmounttoPay - a.totalAmounttoPay;
      }
    });
    setFilteredBookings(sorted);
    setSortBy(sortBy === "asc" ? "desc" : "asc");
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewMore = async (id) => {
    console.log(id);
    navigate("/admin/singlebookingdetails", { state: { id: id } });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="w-full md:w-auto">
          <label htmlFor="search" className="mr-2 font-semibold">
            Search by User Name:
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-auto focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center w-full md:w-auto space-x-4">
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 font-semibold">
              Sort by Amount:
            </label>
            <div className="relative">
              <select
                id="sort"
                value={sortBy}
                onChange={handleSort}
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:border-blue-500"
              >
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg
                  className="h-4 w-4 fill-current text-gray-500"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </div>
          </div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={() => paginate(currentPage)}
              aria-current="page"
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 z-10 bg-blue-50`}
            >
              {currentPage}
            </button>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredBookings.length / bookingsPerPage)
              }
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-800">
                User Image
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-800">
                User Name
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-800">
                Provider Image
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-800">
                Provider Name
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-800">
                Address
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-800">
                Status
              </th>
              <th className="px-6 py-3 text-right font-semibold text-gray-800">
                Amount
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentBookings.map((booking) => (
              <tr
                key={booking._id}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <img
                    src={booking?.image[0] || userImage}
                    alt={booking?.user?.name || "User Image"}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4">
                  {booking?.user?.userName || "N/A"}
                </td>
                <td className="px-6 py-4">
                  <img
                    src={booking?.provider?.providerImage[0] || ""}
                    alt={booking?.provider?.name || "Provider Image"}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4">
                  {booking?.provider?.providerName || "N/A"}
                </td>
                <td className="px-6 py-4">
                  {booking?.provider?.ProviderCity || "N/A"}
                </td>
                <td className="px-6 py-4">{booking?.status || "N/A"}</td>
                <td className="px-6 py-4 text-right">
                  {booking?.totalAmounttoPay
                    ? `₹${booking.totalAmounttoPay.toLocaleString()}`
                    : "N/A"}
                </td>
                <td className="px-6 py-4 text-blue-500 hover:text-blue-700 underline cursor-pointer">
                  <button onClick={() => handleViewMore(booking._id)}>
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
