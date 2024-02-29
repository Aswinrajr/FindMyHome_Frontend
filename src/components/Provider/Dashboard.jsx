import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'

const Dashboard = () => {
  const providerRoute = import.meta.env.VITE_PROVIDER_ROUTE;
  const navigate = useNavigate()
  const providerEmail = localStorage.getItem("provider");
  console.log("Provider Email", providerEmail);

  useEffect(() => {
    const completeData = async () => {
      try {
        const response = await axios.post(
          `${providerRoute}/completedata`,
          { providerEmail }
        );
        console.log(response);
        if(response.data.msg==="Complete your profile Data"){
          Swal.fire({
            title: "Profile Updation Pending!!",
            text: "Complete Your Profile Info",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Go to profile"
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/provider/profileedit")
              
            }
          });
        }
      } catch (error) {
        console.error("Error completing data:", error);
      }
    };
    
    if (providerEmail) {
      completeData();
    }
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
