import Topbar from "../../components/Admin/layout/Topbar";
import Sidebar from "../../components/Admin/layout/Sidebar";
import Bookings from "../../components/Admin/management/BookingList";

function BookingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex flex-1 flex-col md:flex-row">
        <div className="w-full md:w-64 bg-fuchsia-700">
          <Sidebar />
        </div>

        <div className="flex-1 bg-gray-100 p-6">
          <h1 className="text-2xl font-semibold mb-4">Booking List</h1>
          <div className="bg-white rounded-lg shadow-md p-4">
            <Bookings />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
