import Footer from "../../components/Sample/Footer";
import TopBar from "../../components/Sample/TopBar";
import AddedRoomPreview from "../../components/User/AddedRoomPreview";

const UserAddedRoomDetails = () => {
  return (
    <div className="h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-grow">
        <AddedRoomPreview />
      </div>
      <Footer />
    </div>
  );
};

export default UserAddedRoomDetails;
