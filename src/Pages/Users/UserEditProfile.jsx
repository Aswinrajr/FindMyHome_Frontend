import { useEffect, useState } from "react";
import TopBar from "../../components/Sample/TopBar";
import Footer from "../../components/Sample/Footer";
import profileImage from "../../assets/profile_demo.avif";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const UserEditProfile = () => {
  const user = localStorage.getItem("user");
  const baseUrl = import.meta.env.VITE_BASE_URL_ROUTE;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "Male",
    address: "",
    image: null,
    imageUrl: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${baseUrl}/getuserdata`, { user });
        const userData = response.data.data;
        setFormData({
          name: userData.userName || "",
          email: userData.userEmail || "",
          mobile: userData.userMobile || "",
          gender: userData.gender || "Male",
          address: userData.userAdress || "",
          image: userData.image || null,
          imageUrl: userData.image ? `${baseUrl}/${userData.image}` : null,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [baseUrl, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
      imageUrl: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.put(
        `${baseUrl}/updateuserdata`,
        formDataToSend
      );
      console.log(response.data);
      if (response.status === 200) {
        toast.success(response.data.message);
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
            <div className="flex items-center justify-between mb-6">
              <div className="w-auto h-auto relative flex-shrink-0">
                <img
                  src={
                    formData.imageUrl
                      ? formData.imageUrl
                      : formData.image
                      ? `${baseUrl}/${formData.image}`
                      : profileImage
                  }
                  alt="Profile"
                  className="w-96 h-72 object-cover rounded-lg"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute bottom-0 left-0 cursor-pointer hover:bg-grey-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col flex-grow ml-32">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 p-2 w-3/4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Email:
                    </label>
                    <div className="mt-1 p-2 w-3/4 border border-gray-300 bg-gray-200  rounded focus:outline-none focus:ring focus:border-blue-500">
                      {formData.email}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile:
                    </label>
                    <div className="mt-1 p-2 w-3/4 border border-gray-300 bg-gray-200 rounded focus:outline-none focus:ring focus:border-blue-500">
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
                      className="mt-1 p-2 w-3/4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
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
                      className="mt-1 p-2 w-3/4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
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
