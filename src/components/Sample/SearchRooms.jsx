import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const SearchRooms = () => {
  const baseRoute = import.meta.env.VITE_BASE_URL_ROUTE;
  const [error, setError] = useState(false)
  const [cityError,setCityerr] = useState()
  const [date,setDate] = useState()
  
  const [adults,setAduls] = useState()
  const [children,setChildren] = useState()

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
    // if(!formData.city||!formData.checkIn||!formData.checkOut||!formData.adults||!formData.children){
    //   setCityerr("cITY REQUIRED")
    //   setDate("Date required")
    //   setAduls("Adults required")
    //   setChildren("children req")
    //   return toast.error("All fields are required")
    // }
    if(formData.checkIn>formData.checkOut){
      return toast.error("Selected date is invlid")

    }
    console.log(formData)
    

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
        const nearbyUser = response.data.data.nearbyUser 
        console.log("nearbyProviders.data",nearbyProviders.data);
        const data = {
          formData,
          nearbyProviders,
          nearbyUser
        };
        console.log("Daaaata",data)
        if (response.status === 200) {
          navigate("/searchedroom", { state: data });
        }
      };
      fetchData();
    } catch (err) {
      console.log(err);

      // return toast.error("All fields are required")
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
        <Toaster position="top-center" reverseOrder={false} />
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
            <h1 className="text-red-500" >{cityError}</h1>
           
            <input
              type="date"
              name="checkIn"
              placeholder="Check-in"
              className="flex-1 p-2 border"
              onChange={handleChange}
            />
             <h1 className="text-red-500" >{date}</h1>
            <input
              type="date"
              name="checkOut"
              placeholder="Check-out"
              className="flex-1 p-2 border"
              onChange={handleChange}
            />
              <h1 className="text-red-500" >{date}</h1>
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
              <h1 className="text-red-500" >{adults}</h1>
            <input
              type="number"
              name="children"
              placeholder="Children"
              className="flex-1 p-2 border appearance-none"
              min="0"
              max="10"
              onChange={handleChange}
            />
              <h1 className="text-red-500" >{children}</h1>
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
