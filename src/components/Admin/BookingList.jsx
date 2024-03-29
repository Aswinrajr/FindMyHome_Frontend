

const BookingList = (props) => {
  const bookings = [
    {
      id: 1,
      user: {
        id: 1,
        name: "John Doe",
        mobile: "1234567890",
        image: "user_image_url",
      },
      provider: {
        id: 1,
        name: "Provider 1",
        image: "provider_image_url",
        address: "Provider Address",
      },
      checkInDate: "2024-01-27",
      checkOutDate: "2024-01-30",
      status: "Confirmed",
      amount: "$200",
    },
   
  ];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        <table className="w-full whitespace-nowrap bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">User Image</th>
              <th scope="col" className="px-6 py-3">User Name</th>
              <th scope="col" className="px-6 py-3">Provider Image</th>
              <th scope="col" className="px-6 py-3">Provider Name</th>
              <th scope="col" className="px-6 py-3">Address</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Amount</th>
            
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={props.profile} alt={booking.user.name} className="h-10 w-10 rounded-full" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={props.room} alt={booking.provider.name} className="h-10 w-10 rounded-full" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.provider.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.provider.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">View More</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
