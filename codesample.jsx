import { useState } from "react";
// import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
import TopBar from "../../components/Sample/TopBar";
import Footer from "../../components/Sample/Footer";
import { uploadCloudinary } from "../../Helper/Upload";
import { BeatLoader } from "react-spinners";
import { userAddsRoom } from "../../service/User/UserService";

const UserAddRoom = () => {
  const email = localStorage.getItem("userAccessToken");

  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  // const baseUrl = import.meta.env.VITE_BASE_URL_ROUTE;
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [imageErr, setImageErr] = useState("");

  const [adultErr, setAdultErr] = useState();
  const [childErr, setChildErr] = useState();
  const [amountErr, setAmountErr] = useState();

  const [roomData, setRoomData] = useState({
    roomType: "",
    adults: "",
    children: "",
    amount: "",
    status: "",
    email: "",
    amenities: {
      food: false,
      ac: false,
      wifi: false,
      tv: false,
      hotWater: false,
    },
    images: [],
  });
  if (!email) return <Navigate to="/" />;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value);
    if (name === "adults" && value < 1) {
      setAdultErr("Number of adults cannot be less than 1");
      setTimeout(() => {
        setAdultErr("");
      }, 3000);
    }
    if (name === "adults" && value > 10) {
      setAdultErr("Number of adults cannot be greater than 10");
      setTimeout(() => {
        setAdultErr("");
      }, 3000);
    }
    if (name === "children" && value < 0) {
      setChildErr("Number of children cannot be less than 0");
      setTimeout(() => {
        setChildErr("");
      }, 3000);
    }
    if (name === "children" && value > 10) {
      setChildErr("Number of children cannot be greater than 10");
      setTimeout(() => {
        setChildErr("");
      }, 3000);
    }
    if (name === "amount" && value < 300) {
      setAmountErr(" amount cannot be less than 300");
      setTimeout(() => {
        setAmountErr("");
      }, 3000);
    }
    if (name === "amount" && value >= 10000) {
      setAmountErr(" amount cannot be greater than 10000");
      setTimeout(() => {
        setAmountErr("");
      }, 3000);
    }

    if (type === "checkbox") {
      setRoomData((prevData) => ({
        ...prevData,
        amenities: {
          ...prevData.amenities,
          [name]: checked,
        },
      }));
    } else {
      setRoomData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleUploadImage = async (e) => {
    e.preventDefault();

    if (imageUrl.length < 4) {
      setImageErr("Image shoulb be 5 in nos");
      setTimeout(() => {
        setImageErr("");
      }, 1000);
      return;
    }

    setLoading(true);
    const uploadedImages = [];
    for (let i = 0; i < imageUrl.length; i++) {
      const data = await uploadCloudinary(imageUrl[i]);
      const { url,format } = data;
      console.log(format)
      console.log(url);

      if (format!=="jpg") {
        setImageErr("Selected file is not applicable");
        setTimeout(() => {
          setImageErr("");
          setLoading(false);
        }, 1000);
        return;
      }
      // console.log("Data=======>", url);
      uploadedImages.push(url);
    }

    setLoading(false);
    // console.log("Link=========>", uploadedImages);
    setFiles(uploadedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !roomData.roomType ||
      !roomData.adults ||
      !roomData.children ||
      !roomData.status ||
      !roomData.amount
    ) {
      setErr("Required all the  fields");

      setTimeout(() => {
        setErr("");
        setImageErr("");
      }, 1000);
      return;
    }
    if (imageUrl.length < 4) {
      setImageErr("Image shoulb be 5 in nos");
      setTimeout(() => {
        setImageErr("");
      }, 1000);
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("roomType", roomData.roomType);
    formData.append("adults", roomData.adults);
    formData.append("children", roomData.children);
    formData.append("amount", roomData.amount);
    formData.append("status", roomData.status);

    formData.append("amenities", JSON.stringify(roomData.amenities));

    const data = {
      roomData,
      files,
    };

    try {
      // console.log(data);
      const response = await userAddsRoom(data);

      console.log("Response in add rooms", response);
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/room");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <TopBar />
      <div className="container mx-auto px-4 mt-8 mb-7">
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className="text-2xl font-semibold mb-4">Add Rooms</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="roomType"
              className="block text-sm font-medium text-gray-700"
            >
              Room Type
            </label>
            <select
              id="roomType"
              name="roomType"
              value={roomData.roomType}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a room type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Dormetry">Dormetry</option>
            </select>
            {err && <p className="text-red-500 text-sm mt-1">{err}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="adults"
              className="block text-sm font-medium text-gray-700"
            >
              Adults
            </label>
            <input
              type="number"
              id="adults"
              name="adults"
              value={roomData.adults}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter number of adult"
              max={10}
              min={1}
            />

            {err && <p className="text-red-500 text-sm mt-1">{err}</p>}
            {adultErr && (
              <p className="text-red-500 text-lg mt-2">{adultErr}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="children"
              className="block text-sm font-medium text-gray-700"
            >
              Children
            </label>
            <input
              type="number"
              id="children"
              name="children"
              value={roomData.children}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter number of children"
              min={0}
              max={10}
            />
            {err && <p className="text-red-500 text-sm mt-1">{err}</p>}
            {childErr && (
              <p className="text-red-500 text-lg mt-2">{childErr}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={roomData.amount}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
              min={300}
              max={10000}
              maxLength={4}
            />
            {err && <p className="text-red-500 text-sm mt-1">{err}</p>}
            {amountErr && (
              <p className="text-red-500 text-lg mt-2">{amountErr}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={roomData.status}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select status</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
            {err && <p className="text-red-500 text-sm mt-1">{err}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Amenities
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              {Object.entries(roomData.amenities).map(
                ([amenity, checked], index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={amenity}
                      name={amenity}
                      checked={checked}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={amenity}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {amenity}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="col-span-2">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Images
              </label>
              <input
                type="file"
                onChange={(e) => setImageUrl(e.target.files)}
                name="images"
                id="images"
                accept="image/*"
                multiple
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {imageErr && (
              <p className="text-red-500 text-sm mt-1">{imageErr}</p>
            )}
            {loading && <BeatLoader color="#36d7b7" />}
            <div className="flex space-x-2">
              {files.map((file, index) => (
                <img
                  key={index}
                  src={`${file}`}
                  alt={`Image ${index + 1}`}
                  className="max-w-xs max-h-xs"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              ))}
            </div>
          </div>
          <button
            className="col-span-2 w-28 px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:green-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            onClick={handleUploadImage}
          >
            Upload image
          </button>
          <button
            type="submit"
            className="col-span-2 w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            Add Room
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UserAddRoom;
