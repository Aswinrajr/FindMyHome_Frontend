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
   
    setLoading(true);
    const uploadedImages = [];

    if (imageUrl.length <= 4) {
      toast.error("Image should be 5 in numbers");
      setLoading(false);
      return;
    }

    try {
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

        console.log("Data=======>", url);
        uploadedImages.push(url);
      }

      setLoading(false);
    
      setFiles(uploadedImages);
    } catch (err) {
      console.log("errror", err.response.data.error);
      toast.error(err.response.data.error.message);
      setLoading(false);
    }
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

       
        if (saveResponse.status === 200) {
          toast.success(saveResponse.data.message);
          setTimeout(() => {
            navigate("/provider/rooms");
          }, 2000);
        }
      } else {
        throw new Error("No results found for the city");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
<div className="container mx-auto px-4 py-8">
  <Toaster position="top-center" reverseOrder={false} />

  <div className="bg-white rounded-lg shadow-md p-8">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
      Provider Profile
    </h2>

    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label
              htmlFor="providerName"
              className="block text-gray-700 font-semibold mb-2"
            >
              Residence Name
            </label>
            <input
              type="text"
              id="providerName"
              name="providerName"
              value={providerDetails.providerName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Residence Name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="providerRooms"
              className="block text-gray-700 font-semibold mb-2"
            >
              No of Rooms
            </label>
            <input
              type="text"
              id="providerRooms"
              name="providerRooms"
              value={providerDetails.providerRooms}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter number of rooms"
            />
            {roomError && (
              <p className="text-red-500 text-sm mt-2">{roomError}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 font-semibold mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="providerAddress"
              value={providerDetails.providerAddress}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter location"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="ProviderCity"
              className="block text-gray-700 font-semibold mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="ProviderCity"
              name="ProviderCity"
              value={providerDetails.ProviderCity}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your City"
            />
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Facilities
            </label>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(providerDetails.facilities).map(
                ([facility, checked], index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={facility}
                      name={`facility_${facility}`}
                      checked={checked}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />

                    <label htmlFor={facility} className="ml-2 text-gray-700">
                      {facility}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Images
            </label>
            <div className="flex flex-wrap -mx-2">
              {files?.map((fileData, index) => (
                <div key={index} className="w-1/3 px-2 mb-4">
                  <img
                    src={
                      providerDetails?.providerImage
                        ? `${fileData}`
                        : fileData.dataURL
                    }
                    alt={`Image ${index + 1}`}
                    className="w-full h-auto rounded-md"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center mb-4">
              <input
                type="file"
                onChange={(e) => setImageUrl(e.target.files)}
                name="images"
                id="images"
                accept="image/*"
                multiple
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {loading && (
              <div className="flex justify-center mb-4">
                <BeatLoader color="#6b21a8" />
              </div>
            )}
            <div className="button-container">
              <button
                className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                onClick={handleUploadImage}
              >
                Upload Image
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
        >
          Update Details
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default ProviderDetails;
