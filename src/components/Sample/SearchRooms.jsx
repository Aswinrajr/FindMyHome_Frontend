import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const SearchRooms = () => {
  const baseRoute = import.meta.env.VITE_BASE_URL_ROUTE;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    adults: 0,
    children: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        console.log(response);
        const nearbyProviders = response.data.nearbyProviders;
        console.log(nearbyProviders);
        const data = {
          formData,
          nearbyProviders,
        };
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section className="py-16 px-8 bg-gray-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Search Rooms</h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="flex-1 p-2 border"
              onChange={handleChange}
            />
            <input
              type="date"
              name="checkIn"
              placeholder="Check-in"
              className="flex-1 p-2 border"
              onChange={handleChange}
            />
            <input
              type="date"
              name="checkOut"
              placeholder="Check-out"
              className="flex-1 p-2 border"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <input
              type="number"
              name="adults"
              placeholder="Adults"
              className="flex-1 p-2 border appearance-none"
              min="0"
              max="10"
              onChange={handleChange}
            />
            <input
              type="number"
              name="children"
              placeholder="Children"
              className="flex-1 p-2 border appearance-none"
              min="0"
              max="10"
              onChange={handleChange}
            />
          </div>
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
