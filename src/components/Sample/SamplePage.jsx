import TopBar from "./TopBar";
import Banner from "./Banner";
import SearchRooms from "./SearchRooms";
import Services from "./Services";
import Footer from "./Footer";

const SamplePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TopBar />
      <Banner />
      <SearchRooms />

      <Services />
      <Footer />
    </div>
  );
};

export default SamplePage;
