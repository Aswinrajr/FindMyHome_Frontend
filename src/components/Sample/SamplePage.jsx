import TopBar from "./TopBar";
import Banner from "./Banner";
import SearchRooms from "./SearchRooms";
import Services from "./Services";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import {logout} from "../../features/userAuth"

const SamplePage = () => {
  const dispatch = useDispatch()
  
  const  user = localStorage.getItem("accessToken")
  if(user){
    setTimeout(()=>{
      dispatch(logout)

    },5000)
  }
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
