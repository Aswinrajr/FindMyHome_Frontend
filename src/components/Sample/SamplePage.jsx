
import TopBar from "./TopBar";
import Banner from "./Banner";
import SearchRooms from "./SearchRooms";
import Services from "./Services";
import Footer from "./Footer";

const SamplePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <TopBar />

      <Banner />

      <SearchRooms />

      <Services />

      <Footer />
    </div>
  );
};

export default SamplePage;
