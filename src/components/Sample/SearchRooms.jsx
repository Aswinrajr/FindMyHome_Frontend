import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const SearchRooms = () => {
  const baseRoute = import.meta.env.VITE_BASE_URL_ROUTE;

  const [date, setDate] = useState();
  const [error, setError] = useState();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    adults: 0,
    children: 0,
  });

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("city"),
      {}
    );
    console.log(autocomplete);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.address_components) {
        const cityComponent = place.address_components.find(
          (component) => component.long_name
        );
        console.log(cityComponent);

        const cityName = cityComponent ? cityComponent.long_name : "";

        console.log(cityName);
      }
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !formData.city ||
      !formData.checkIn ||
      !formData.adults ||
      !formData.children
    ) {
      setError("All fields are required");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }

    if (formData.checkIn > formData.checkOut) {
      setError("Selected date is invalid");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }

    if (formData.checkIn < formattedDate || formData.checkOut < formattedDate) {
      setError("Selected date is invalid");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    console.log(formData);

    try {
      const cordResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          formData.city
        )}&key=AIzaSyAoUo0-J9X1J7Dv08pnGwigpu2Jw_KAr8k`
      );
      const { results } = cordResponse.data;
      const { lat, lng } = results[0].geometry.location;

      console.log(formData);
      console.log(baseRoute);
      const fetchData = async () => {
        const response = await axios.post(`${baseRoute}/searchrooms`, {
          city: formData.city,
          latitude: lat,
          longitude: lng,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          adults: formData.adults,
          children: formData.children,
        });
        console.log(response.data.data);
        const nearbyProviders = response.data.data.nearbyProviders;
        const nearbyUser = response.data.data.nearbyUser;
        console.log("nearbyProviders.data", nearbyProviders.data);
        const data = {
          formData,
          nearbyProviders,
          nearbyUser,
        };
        console.log("Daaaata", data);
        if (response.status === 200) {
          navigate("/searchedroom", { state: data });
        }
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "adults" && value < 1) {
      setError("No of person cannot be less than 1");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    if (name === "children" && value < 0) {
      setError("No of children cannot be less than 0");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-200">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Search Rooms</h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              className="p-2 border rounded"
              onChange={handleChange}
            />
            <input
              type="date"
              name="checkIn"
              placeholder="Check-in"
              className="p-2 border rounded"
              onChange={handleChange}
            />
            <input
              type="date"
              name="checkOut"
              placeholder="Check-out"
              className="p-2 border rounded"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="adults"
              placeholder="Adults"
              className="p-2 border rounded"
              min="1"
              max="10"
              onChange={handleChange}
            />
            <input
              type="number"
              name="children"
              placeholder="Children"
              className="p-2 border rounded"
              min="0"
              max="10"
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchRooms;
