import { useEffect, useState } from "react";

import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../api/axios";
import { uploadCloudinary } from "../../Helper/Upload"; 
import { BeatLoader } from "react-spinners";


const EditRooms = () => {
  let token = localStorage.getItem("providerAccessToken");


  const newToken = JSON.parse(token);
  console.log(newToken);
  token = newToken?.providerAccessToken;

  const navigate = useNavigate();
  const { roomId } = useParams();

  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState({
    roomType: "",
    adults: "",
    children: "",
    amount: "",
    status: "",
    amenities: {
      food: false,
      ac: false,
      wifi: false,
      tv: false,
      hotWater: false,
    },
    images: [],
  });

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axiosInstance.get(
          `/provider/rooms/editrooms/${roomId}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRoomData(response.data);
        setFiles(response.data.images)
        console.log("Images=====>",files)
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setRoomData((prevData) => ({
        ...prevData,
        amenities: {
          ...prevData.amenities,
          [name]: checked,
        },
      }));
    } 
    
    else {
      setRoomData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    console.log(imageUrl);
    setLoading(true);
    const uploadedImages = [];
    for (let i = 0; i < imageUrl.length; i++) {
      const data = await uploadCloudinary(imageUrl[i]);
      const { url } = data;
      console.log("Data=======>", url);
      uploadedImages.push(url);
    }

    setLoading(false);
    console.log("Link=========>", uploadedImages);
    setFiles(uploadedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      files
    }

    try {
      const response = await axiosInstance.post(
        `/provider/rooms/updaterooms/${roomData._id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Room Updated Successfully");
        setTimeout(() => {
          navigate("/provider/rooms");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Occured while updating the room");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-semibold mb-4">Edit Room</h1>
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
            required
          >
            <option value="">Select a room type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
            <option value="Premium">Premium</option>
          </select>
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
            placeholder="Enter number of adults"
            required
          />
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
            required
          />
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
            required
          />
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
            required
          >
            <option value="available">Available</option>
            <option value="not-available">Not Available</option>
          </select>
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
    
          <button
            className="col-span-2 w-28 px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:green-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            onClick={handleUploadImage}
          >Upload image</button>
        </div>
        <button
          type="submit"
          className="col-span-2 w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Update Room
        </button>
      </form>
    </div>
  );
};

export default EditRooms;
