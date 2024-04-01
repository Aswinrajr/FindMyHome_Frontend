import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const ProviderDetails = () => {
  const providerRoute = import.meta.env.VITE_PROVIDER_ROUTE;
  const providerEmail = localStorage.getItem("provider");
  console.log("Provider Email", providerEmail);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [roomError, setRoomError] = useState("");
  const [providerDetails, setProviderDetails] = useState({
    recidenceName: "",
    rooms: "",
    location: "",
    city: "",
    facilities: {
      parking: false,
      pool: false,
      wifi: false,
      tv: false,
      hotWater: false,
    },
    images: [],
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("location"),
      {}
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setProviderDetails((prevData) => ({
        ...prevData,
        location: place.formatted_address,
      }));
    });

    const fetchData = async () => {
      const response = await axios.post(`${providerRoute}/getprovider`, {
        providerEmail,
      });
      console.log(response);
      if (response.data) {
        setProviderDetails(response.data);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "rooms") {
      if (!/^\d+$/.test(value)) {
        setRoomError("Room must be a number");
      } else {
        setRoomError("");
      }
    }

    if (type === "checkbox") {
      setProviderDetails((prevData) => ({
        ...prevData,
        facilities: {
          ...prevData.facilities,
          [name]: checked,
        },
      }));
    } else {
      setProviderDetails((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (roomError) {
      return;
    }

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          providerDetails.city
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
        formData.append("rooms", providerDetails.rooms);
        formData.append("location", providerDetails.location);
        formData.append("providerEmail", providerEmail);
        formData.append("city", providerDetails.city);

        formData.append("coordinates", `${lat},${lng}`);

        formData.append(
          "facilities",
          JSON.stringify(providerDetails.facilities)
        );

        const saveResponse = await axios.post(
          `${providerRoute}/savedata`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(saveResponse);
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
    <div className="container mx-auto px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label
            htmlFor="recidenceName"
            className="block text-sm font-medium text-gray-700"
          >
            Residence Name
          </label>
          <input
            type="text"
            id="recidenceName"
            name="recidenceName"
            value={editMode ? "" : providerDetails?.providerName}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder={editMode ? " " : `${providerDetails.providerName}`}
            required
            readOnly={!editMode}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="room"
            className="block text-sm font-medium text-gray-700"
          >
            No of Rooms
          </label>
          <input
            type="text"
            id="rooms"
            name="rooms"
            value={editMode ? "" : providerDetails?.providerRooms}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter number of rooms"
            required
            readOnly={!editMode}
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
            name="location"
            value={editMode ? "" : providerDetails?.providerAddress}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter location"
            required
            readOnly={!editMode}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={editMode ? "" : providerDetails?.ProviderCity}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your City"
            required
            readOnly={!editMode}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Facilities
          </label>
          <div className="mt-1 grid grid-cols-2 gap-4">
            {providerDetails?.facilities &&
              Object.entries(providerDetails?.facilities).map(
                ([facility, checked], index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={facility}
                      name={facility}
                      checked={checked}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                      disabled={!editMode}
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
              onChange={handleImageChange}
              name="images"
              id="images"
              accept="image/*"
              multiple
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={!editMode}
            />
          </div>
          <div className="flex space-x-2">
            {files?.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Image ${index + 1}`}
                className="max-w-xs max-h-xs"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="col-span-2 w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          disabled={!editMode}
        >
          Update Details
        </button>
      </form>
      <div className="mt-4">
        <button
          onClick={() => setEditMode((prevMode) => !prevMode)}
          className="px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-lg active:bg-gray-600 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray"
        >
          {editMode ? "Cancel" : "Edit Details"}
        </button>
      </div>
    </div>
  );
};

export default ProviderDetails;
