import axios from "axios";
import { useEffect, useState } from "react";
import pics from "../../assets/2.jpeg"

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const adminRoute =import.meta.env.VITE_ADMIN_ROUTE

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(
          `${adminRoute}/getallbookingdata`
        );
        console.log("response",response)
        setBookings(response.data.orders); 
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    fetchBookingData();
  }, []); 

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        <table className="w-full whitespace-nowrap bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Image
              </th>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Provider Image
              </th>
              <th scope="col" className="px-6 py-3">
                Provider Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={pics} alt={booking.userName} className="h-10 w-10 rounded-full" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.userName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={pics} alt={booking.providerName} className="h-10 w-10 rounded-full" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.providerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">Booked</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
