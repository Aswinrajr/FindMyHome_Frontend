import { useEffect, useState } from "react";

import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

import { uploadCloudinary } from "../../Helper/Upload";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { providerInstance } from "../../api/providerAxiosInstance";
import { getProviderData } from "../../service/Provider/LoginService";

const ProviderDetails = () => {
  let token = localStorage.getItem("providerAccessToken");
  const newToken = JSON.parse(token);
  token = newToken?.providerAccessToken;
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [roomError, setRoomError] = useState("");
  const [imageUrl, setImageUrl] = useState();

  const [loading, setLoading] = useState(false);

  const [providerDetails, setProviderDetails] = useState({
    providerName: "",
    providerRooms: "",
    providerAddress: "",
    ProviderCity: "",
    facilities: {
      parking: false,
      pool: false,
      wifi: false,
      tv: false,
      hotWater: false,
    },
    providerImage: [],
  });

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("location"),
      {}
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setProviderDetails((prevData) => ({
        ...prevData,
        providerAddress: place.formatted_address,
        ProviderCity: place.address_components.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("administrative_area_level_1")
        )?.long_name,
      }));
    });

    const fetchData = async () => {
      const response = await providerInstance.get(`/getprovider`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setProviderDetails(response.data.providerData);
        setFiles(response.data.providerData.providerImage);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (name === "providerRooms") {
      if (!/^\d+$/.test(value)) {
        setRoomError("Rooms must be a number");
      } else {
        setRoomError("");
        setProviderDetails((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else if (name.startsWith("facility_")) {
      const facilityName = name.replace("facility_", "");
      setProviderDetails((prevData) => ({
        ...prevData,
        facilities: {
          ...prevData.facilities,
          [facilityName]: checked,
        },
      }));
    } else {
      setProviderDetails((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
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

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          providerDetails.ProviderCity
        )}&key=AIzaSyAoUo0-J9X1J7Dv08pnGwigpu2Jw_KAr8k`
      );
      const { results } = response.data;
      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        console.log(lat, lng);
        console.log(typeof lat);
        console.log(typeof lng);

        const formData = new FormData();
        files.forEach((file) => {
          formData.append("images", file);
        });

        formData.append("recidenceName", providerDetails.recidenceName);
        formData.append("rooms", providerDetails.providerRooms);
        formData.append("location", providerDetails.location);

        formData.append("city", providerDetails.city);

        formData.append("coordinates", `${lat},${lng}`);

        formData.append(
          "facilities",
          JSON.stringify(providerDetails.facilities)
        );

        const data = {
          providerDetails,
          files,
          lat,
          lng,
        };
        console.log("data==>", data);

        const saveResponse = await getProviderData(data);

        console.log("====>", saveResponse);
        if (saveResponse.status === 200) {
          toast.success(saveResponse.data.message);
          setTimeout(() => {
            navigate("/provider/rooms");
          }, 2000);
        }
      } else {
        throw new Error("No results found for the city");
      }

      // const formData = new FormData();

      // formData.append("images", link);
      // formData.append("providerName", providerDetails.providerName);
      // formData.append("providerRooms", providerDetails.providerRooms);
      // formData.append("providerAddress", providerDetails.providerAddress);
      // formData.append("ProviderCity", providerDetails.ProviderCity);
      // formData.append("facilities", JSON.stringify(providerDetails.facilities));

      // console.log("==-=====>", formData);
      // const data = {
      //   providerDetails,
      //   link,
      // };

      // const response = await axiosInstance.post(`provider/savedata`, data, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // if (response.status === 200) {
      //   toast.success(response.data.message);
      //   setTimeout(() => {
      //     navigate("/provider/rooms");
      //   }, 2000);
      // }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label
            htmlFor="providerName"
            className="block text-sm font-medium text-gray-700"
          >
            Residence Name
          </label>
          <input
            type="text"
            id="providerName"
            name="providerName"
            value={providerDetails.providerName}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Residence Name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="providerRooms"
            className="block text-sm font-medium text-gray-700"
          >
            No of Rooms
          </label>
          <input
            type="text"
            id="providerRooms"
            name="providerRooms"
            value={providerDetails.providerRooms}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter number of rooms"
          />

          {roomError && (
            <p className="text-red-500 text-sm mt-1">{roomError}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="providerAddress"
            value={providerDetails.providerAddress}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter location"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="ProviderCity"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="ProviderCity"
            name="ProviderCity"
            value={providerDetails.ProviderCity}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your City"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Facilities
          </label>
          <div className="mt-1 grid grid-cols-2 gap-4">
            {Object.entries(providerDetails.facilities).map(
              ([facility, checked], index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={facility}
                    name={`facility_${facility}`}
                    checked={checked}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                  />

                  <label
                    htmlFor={facility}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {facility}
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
            {files?.map((fileData, index) => (
              <img
                key={index}
                src={
                  providerDetails?.providerImage
                    ? `${fileData}`
                    : fileData.dataURL
                }
                alt={`Image ${index + 1}`}
                className="max-w-xs max-h-xs"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
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
          className="col-span-2 w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Update Details
        </button>
      </form>
    </div>
  );
};

export default ProviderDetails;
