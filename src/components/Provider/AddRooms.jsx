import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { uploadCloudinary } from "../../Helper/Upload";
import { BeatLoader } from "react-spinners";
import { addRooms } from "../../service/Provider/LoginService";

const AddRooms = () => {
  let token = localStorage.getItem("providerAccessToken");
  const newToken = JSON.parse(token);
  token = newToken?.providerAccessToken;

  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageErr, setimageErr] = useState("");
  const [adultErr, setAdultErr] = useState();
  const [childErr, setChildErr] = useState();
  const [amountErr, setAmountErr] = useState();

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
      setRoomData((prevState) => ({
        ...prevState,
        amenities: {
          ...prevState.amenities,
          [name]: checked,
        },
      }));
    } else {
      setRoomData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();

    if (imageUrl.length < 4) {
      console.log("Min 5 image required");
      setimageErr("Minmum of 5 image required");
      setTimeout(() => {
        setimageErr();
      }, 1000);
      return;
    }

    setTimeout(() => {
      setimageErr("");
    }, 1000);
    setLoading(true);
    const uploadedImages = [];
    for (let i = 0; i < imageUrl.length; i++) {
      const data = await uploadCloudinary(imageUrl[i]);
      const { url } = data;

      if (!url.includes(".jpg" || ".jpeg" || "png")) {
        toast.error(
          "Selected image is not valid please select .png or .jpg or .jpeg format "
        );
        setLoading(false);
        return;
      }

      uploadedImages.push(url);
    }
    setLoading(false);
    setFiles(uploadedImages);
  };

  const handleDeleteImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    const newImages = Array.from(e.target.files);
  
    if (newImages.length + files.length > 5) {
      setimageErr("Maximum 5 images are allowed");
      setTimeout(() => {
        setimageErr("");
      }, 1500);
      return;
    }
  
    const uploadedImages = await Promise.all(
      newImages.map(async (image) => {
        const data = await uploadCloudinary(image);
        return data.url;
      })
    );
  
    setFiles([...files, ...uploadedImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !roomData.roomType ||
      !roomData.amount ||
      !roomData.adults ||
      !roomData.children ||
      !roomData.status
    ) {
      return;
    }
    if (files.length < 4) {
      setimageErr("Image should be 5 numbers");
      setTimeout(() => {
        setimageErr("");
      }, 1500);
      return;
    }

    const formData = new FormData();
    const data = {
      roomData,
      files,
    };
    console.log(data);

    formData.append("roomType", roomData.roomType);
    formData.append("adults", roomData.adults);
    formData.append("children", roomData.children);
    formData.append("amount", roomData.amount);
    formData.append("status", roomData.status);
    formData.append("amenities", JSON.stringify(roomData.amenities));

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
   

    try {
      const response = await addRooms(data);

      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/provider/rooms");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <Toaster position="top-center" reverseOrder={false} />
    <h1 className="text-3xl font-bold mb-6 text-gray-800">Add Rooms</h1>
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
          Room Type
        </label>
        <select
          id="roomType"
          name="roomType"
          value={roomData.roomType}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a room type</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
          <option value="Premium">Premium</option>
        </select>
        {roomData.roomType === "" && (
          <p className="text-red-500 text-sm mt-1 bg-red-100 p-2 rounded">Please select a room type</p>
        )}
      </div>
  
      <div>
        <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">
          Adults
        </label>
        <input
          type="number"
          id="adults"
          name="adults"
          value={roomData.adults}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter number of adults"
        />
        {roomData.adults === "" && (
          <p className="text-red-500 text-sm mt-1 bg-red-100 p-2 rounded">No. of adults required</p>
        )}
        {adultErr && <p className="text-red-500 text-sm mt-1 bg-red-100 p-2 rounded">{adultErr}</p>}
      </div>
  
      <div>
        <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">
          Children
        </label>
        <input
          type="number"
          id="children"
          name="children"
          value={roomData.children}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter number of children"
        />
        {roomData.children === "" && (
          <p className="text-red-500 text-sm mt-1 bg-red-100 p-2 rounded">No. of children required</p>
        )}
        {childErr && <p className="text-red-500 text-sm mt-1 bg-red-100 p-2 rounded">{childErr}</p>}
      </div>
  
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={roomData.amount}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount"
        />
        {roomData.amount === "" && (
          <p className="text-red-500 text-sm mt-1 bg-red-100 p-2 rounded">Amount required</p>
        )}
        {amountErr && <p className="text-red-500 text-sm mt-1 bg-red-100 p-2 rounded">{amountErr}</p>}
      </div>
  
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={roomData.status}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select status</option>
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
        </select>
        {roomData.status === "" && (
          <p className="text-red-500 text-sm mt-1 bg-red-100 p-2 rounded">Status required</p>
        )}
      </div>
  
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(roomData.amenities).map(([amenity, checked], index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={amenity}
                name={amenity}
                checked={checked}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={amenity} className="ml-2 text-sm text-gray-700">
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>
  
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
        <input
          type="file"
          onChange={handleAddImage}
          name="images"
          id="images"
          accept="image/*"
          multiple
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {imageErr && <p className="text-red-500 text-sm mt-1 bg-red-100 p-2 rounded">{imageErr}</p>}
        {loading && <BeatLoader color="#36d7b7" className="mt-4" />}
        
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={file}
                alt={`Image ${index + 1}`}
                className="w-full h-32 object-cover rounded-md"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 bg-opacity-75 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={() => handleDeleteImage(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
  
      <button
        type="submit"
        className="md:col-span-2 w-full px-6 py-3 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Add Room
      </button>
    </form>
  </div>
  );
};

export default AddRooms;
