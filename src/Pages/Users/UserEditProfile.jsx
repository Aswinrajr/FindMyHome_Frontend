import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import TopBar from "../../components/Sample/TopBar";
import Footer from "../../components/Sample/Footer";
import profileImage from "../../assets/profile_demo.avif";
import { Navigate, useNavigate } from "react-router";
import {
  editUserProfile,
  userUpdateData,
} from "../../service/User/UserService";
import { uploadCloudinary } from "../../Helper/Upload";

const UserEditProfile = () => {
  const user = localStorage.getItem("userAccessToken");
  const baseUrl = import.meta.env.VITE_BASE_URL_ROUTE;
  const navigate = useNavigate();
console.log(profileImage)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "Male",
    location: "",
    image: null,
    imageUrl: null,
    address: "",
    city: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await editUserProfile();
        console.log("Response in user Edit fetch data", response);

        const userData = response.data.data;
        setFormData((prevData) => ({
          ...prevData,
          name: userData.userName || "",
          email: userData.userEmail || "",
          mobile: userData.userMobile || "",
          gender: userData.gender || "Male",
          location: userData.location || "",
          address: userData.userAdress || "",
          city: userData.city || "",
          image: userData.image || null,
          imageUrl: userData.image  ||null,
        }));
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [baseUrl, user]);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("address"),
      {}
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setFormData((prevData) => ({
        ...prevData,
        address: place.formatted_address,
      }));
    });
  }, []);
  if (!user) return <Navigate to="/" />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    let file = e.target.files[0];
    console.log(file);
    if (/^image\/(jpeg|png|gif|webp|avif|bmp|tiff)$/.test(file.type)) {
      console.log("Valid file type");
    } else {
      console.log("Not valid");
      toast.error("Image is not a valid format");
      setTimeout(() => {
        navigate("/userprofile");
      }, 2000);
    }

    const imageUrl = await uploadCloudinary(file);
    const { url, format } = imageUrl;
    console.log(url, format);

    setFormData((prevData) => ({
      ...prevData,
      image: url,
      imageUrl: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.address || !formData.city) {
      return toast.error("All fields are required");
    }
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          formData.city
        )}&key=AIzaSyAoUo0-J9X1J7Dv08pnGwigpu2Jw_KAr8k`
      );
      const { results } = response.data;
      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("mobile", formData.mobile);
        formDataToSend.append("gender", formData.gender);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("image", formData.image);
        formDataToSend.append("address", formData.address);
        formDataToSend.append("city", formData.city);
        formDataToSend.append("coordinates", `${lat},${lng}`);

        const updateResponse = await userUpdateData(formDataToSend);

        if (updateResponse.status === 200) {
          toast.success(updateResponse.data.message);
          setTimeout(() => {
            navigate("/userprofile");
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Error updating user data");
    }
  };

  return (
    <>
      <TopBar />
      <div className="container mx-auto mt-6 px-4 mb-6">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">
              User Edit Details
            </h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
              <div className="w-full lg:w-auto h-auto relative flex-shrink-0 mb-4 lg:mb-0">
                <img
                  src={
                    formData.imageUrl
                      ? formData.imageUrl
                      : formData.image
                      ? formData.image
                      : profileImage
                  }
                  alt="Profile"
                  className="w-full lg:w-96 h-72 object-contain rounded-lg"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute bottom-0 left-0 cursor-pointer bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col w-full lg:w-auto lg:ml-8">
                <form onSubmit={handleSubmit} className="w-full lg:w-auto">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Email:
                    </label>
                    <div className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 bg-gray-200 rounded focus:outline-none focus:ring focus:border-blue-500">
                      {formData.email}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile:
                    </label>
                    <div className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 bg-gray-200 rounded focus:outline-none focus:ring focus:border-blue-500">
                      {formData.mobile}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Address:
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      id="address"
                      className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      City:
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Gender:
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="mt-6" />
    </>
  );
};

export default UserEditProfile;
