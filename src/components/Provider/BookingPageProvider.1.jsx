import { useEffect, useState } from "react";
import { getAllbookingData } from "../../service/Provider/LoginService";

export const BookingPageProvider = () => {
  // const provider = localStorage.getItem("provider");
  const [bookings, setBooking] = useState();
  useEffect(() => {
    const getBookingDataProvider = async () => {
      const response = await getAllbookingData();
      console.log("==>", response.data.data);
      setBooking(response.data.data);
    };
    getBookingDataProvider();
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
            {bookings?.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={"props.profile"}
                    alt={booking.userId}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.checkInData}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={"props.room"}
                    alt={"logo"}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.checkOutDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {"booking.provider.address"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {"booking.status"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">View More</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
