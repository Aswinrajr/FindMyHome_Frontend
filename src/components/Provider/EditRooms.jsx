import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { uploadCloudinary } from "../../Helper/Upload";
import { BeatLoader } from "react-spinners";
import { providerInstance } from "../../api/providerAxiosInstance";
import { getEditRooms } from "../../service/Provider/LoginService";

const EditRooms = () => {
  let token = localStorage.getItem("providerAccessToken");
  const newToken = JSON.parse(token);
  token = newToken?.providerAccessToken;

  const navigate = useNavigate();
  const { roomId } = useParams();

  const [adultErr, setAdultErr] = useState();
  const [childErr, setChildErr] = useState();
  const [amountErr, setAmountErr] = useState();
  const [imageErr, setimageErr] = useState("");

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
        const response = await getEditRooms(roomId);
        setRoomData(response.data);
        setFiles(response.data.images);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "adults" && roomData.adults < 1) {
      setAdultErr("No of adult cannot be less than 1");
      setTimeout(() => {
        setAdultErr("");
      }, 2000);
    }
    if (name === "children" && roomData.children < 0) {
      setChildErr("No of children cannot be less than 0");
      setTimeout(() => {
        setChildErr("");
      }, 2000);
    }
    if (name === "amount" && roomData.amount < 300) {
      setAmountErr(" Amount cannot be less than 300");
      setTimeout(() => {
        setAmountErr("");
      }, 2000);
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

  const handleImageDelete = (index) => {
    const newImages = [...roomData.images];
    newImages.splice(index, 1);
    setRoomData((prevData) => ({
      ...prevData,
      images: newImages,
    }));
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    const uploadedImages = [...roomData.images];
    const newImageUrls = [];

    for (let i = 0; i < imageUrl.length; i++) {
      const data = await uploadCloudinary(imageUrl[i]);
      const { url, format } = data;

      if (format !== "jpg") {
        toast.error("Selected file is not applicable");
        setLoading(false);
        return;
      }

      if (uploadedImages.length >= 5) {
        toast.error("Maximum 5 images are allowed");
        setLoading(false);
        return;
      }

      uploadedImages.push(url);
      newImageUrls.push(url);
    }

    if (uploadedImages.length < 5) {
      toast.error("At least 5 images are required");
      setLoading(false);
      return;
    }

    setLoading(false);
    setFiles(uploadedImages);
    setRoomData((prevData) => ({
      ...prevData,
      images: uploadedImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    if (roomData.images.length !== 5) {
      toast.error("Exactly 5 images are required");
      return;
    }

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
      const response = await providerInstance.post(
        `/rooms/updaterooms/${roomData._id}`,
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-semibold mb-4">Edit Room</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
      >
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
          {adultErr && <p className="text-red-500 text-sm mt-1">{adultErr}</p>}
        </div>
        <div className="mb-4">
  <label htmlFor="children" className="block text-sm font-medium text-gray-700">
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
  />
  {childErr && <p className="text-red-500 text-sm mt-1">{childErr}</p>}
</div>
<div className="mb-4">
  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
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
  />
  {amountErr && <p className="text-red-500 text-sm mt-1">{amountErr}</p>}
</div>
<div className="mb-4">
  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
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
  <label className="block text-sm font-medium text-gray-700">Amenities</label>
  <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
    {Object.entries(roomData.amenities).map(([amenity, checked], index) => (
      <div key={index} className="flex items-center">
        <input
          type="checkbox"
          id={amenity}
          name={amenity}
          checked={checked}
          onChange={handleChange}
          className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
        />
        <label htmlFor={amenity} className="ml-2 text-sm text-gray-700">
          {amenity}
        </label>
      </div>
    ))}
  </div>
</div>

<div className="col-span-1 lg:col-span-2">
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Images</label>
    <input
      type="file"
      onChange={(e) => setImageUrl(e.target.files)}
      name="images"
      id="images"
      accept="image/*"
      multiple
      className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
    {imageErr && <p className="text-red-500 text-sm mt-1">{imageErr}</p>}
    {loading && <BeatLoader color="#36d7b7" />}
  </div>
  <div className="flex flex-wrap gap-2">
    {roomData.images.map((file, index) => (
      <div key={index} className="relative">
        <img
          src={file}
          alt={`Image ${index + 1}`}
          className="max-w-xs max-h-xs"
          style={{ width: "150px", height: "100px" }}
        />
        <button
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
          onClick={() => handleImageDelete(index)}
        >
          &times;
        </button>
      </div>
    ))}
  </div>
  <button
    className="col-span-2 w-28 px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:green-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
    onClick={handleUploadImage}
  >
    Upload image
  </button>
</div>
<button
  type="submit"
  className="col-span-1 lg:col-span-2 w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
>
  Update Room
</button>
</form>
</div>
);
};

export default EditRooms;