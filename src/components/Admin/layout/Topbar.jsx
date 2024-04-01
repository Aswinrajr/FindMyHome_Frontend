import logoImage from "../../../assets/logo.png";
import profilePic from "../../../assets/3.webp";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const Topbar = () => {
  const navigate = useNavigate()
  const [imagePath,setImagePath] = useState("")
  const admin = localStorage.getItem('admin')
  const adminEmail = JSON.parse(admin)
  const adminName = adminEmail?.admin
  const adminUrl = import.meta.env.VITE_ADMIN_ROUTE;
  const baseUrl = import.meta.env.VITE_BASE_URL_ROUTE;
  console.log(imagePath)

  useEffect(()=>{
    const fetchData = async()=>{
      const response = await axios.get(`${adminUrl}/adminimage`)
      console.log("In navbar image",response)
      setImagePath(response.data.imagePath)
    }
    fetchData()
  },[])

  return (
    <div className="bg-fuchsia-700 text-white px-4 py-2 flex items-center justify-between sm:px-6 lg:px-8">
      <div className="flex items-center">
        <img src={logoImage} alt="Logo" className="h-8 mr-4" />
      </div>

      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-white text-white rounded-md pl-8 pr-3 py-2 focus:outline-none sm:text-sm"
          style={{ minWidth: "200px" }}
        />
        <button className="rounded-md bg-green-600 px-4 py-2 focus:outline-none ml-3">
          Search
        </button>
      </div>

      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <span className="text-sm font-semibold mr-4">{adminName}</span>
          <span onClick={()=>navigate("/admin/profile")} className="text-sm font-semibold cursor-pointer mr-4">Accounts</span>
          <img src={imagePath?`${baseUrl}/${imagePath}`:profilePic} alt="Profile" className="h-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
