import TopBar from "./TopBar";
import Banner from "./Banner";
import SearchRooms from "./SearchRooms";
import Services from "./Services";
import Footer from "./Footer";
import ExploreByType from "./ExploreByType";
import { Navigate } from "react-router";

const SamplePage = () => {

  const user = localStorage.getItem('user')
  if(!user) return <Navigate to="/login"/>
  return (
    <div className="bg-gray-100 min-h-screen">
      <TopBar />
      <Banner />
      <SearchRooms />
      <ExploreByType />

      <Services />
      <Footer />
    </div>
  );
};

export default SamplePage;
