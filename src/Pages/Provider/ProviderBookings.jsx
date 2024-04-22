import Topbar from "../../components/Provider/layout/Topbar";
import Sidebar from "../../components/Provider/layout/Sidebar";
import BookingList from "../../components/Admin/management/BookingList";
import profile from "../../assets/istockphoto-1050564510-2048x2048.jpg";
import room from "../../assets/2.jpeg";
import BookingPageProvider from "../../components/Provider/BookingPageProvider";

function ProviderBookings() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex flex-1 flex-col sm:flex-row">
        <div className="w-full sm:w-64 bg-fuchsia-700">
          <Sidebar />
        </div>

        <div className="flex-1 p-4 bg-gray-100">
          <div className="bg-white rounded-lg shadow-md p-4">
            {/* <BookingList room={room} profile={profile} /> */}
            <BookingPageProvider/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderBookings;
