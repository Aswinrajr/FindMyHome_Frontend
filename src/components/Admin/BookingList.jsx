import axios from "axios";
import { useEffect, useState } from "react";
import userImage from "../../assets/1 - Copy.webp";

const BookingList = () => {
  const baseRoute = import.meta.env.VITE_BASE_URL_ROUTE;
  const [bookings, setBookings] = useState([]);
  const adminRoute = import.meta.env.VITE_ADMIN_ROUTE;

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`${adminRoute}/getallbookingdata`);
        console.log("response", response.data);
        setBookings(response.data.orders);
        console.log("Bookings", bookings);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    fetchBookingData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        <table className="w-full  border-gray-500 border-collapse table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">User Image</th>
              <th className="px-6 py-3 text-left">User Name</th>
              <th className="px-6 py-3 text-left">Provider Image</th>
              <th className="px-6 py-3 text-left">Provider Name</th>
              <th className="px-6 py-3 text-left">Address</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-6 py-4">
                  <img
                    src={
                      booking.user && booking.user.image
                        ? `${baseRoute}/${booking.user.image}`
                        : userImage
                    }
                    alt={
                      booking.user && booking.user.name
                        ? booking.user.name
                        : userImage
                    }
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4">
                  {booking.user && booking.user.userName
                    ? booking.user.userName
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  <img
                    src={
                      booking.provider &&
                      booking.provider.providerImage
                        ? `${baseRoute}/${booking.provider.providerImage[1]}`
                        : ""
                    }
                    alt={
                      booking.provider &&
                      booking.provider.providerName
                        ? booking.provider.name
                        : "Provider Image"
                    }
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4">
                  {booking.provider &&
                  booking.provider.providerName
                    ? booking.provider.providerName
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {booking.provider &&
                  booking.provider.ProviderCity
                    ? booking.provider.ProviderCity
                    : "N/A"}
                </td>
                <td className="px-6 py-4">Booked</td>
                <td className="px-6 py-4">{booking.totalAmounttoPay}</td>
                <td className="px-6 py-4 text-red-500 underline cursor-pointer hover:text-blue-700">View More</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
