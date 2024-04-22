import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import Swal from "sweetalert2";


import { completeDatas } from "../../service/Provider/LoginService";

const Dashboard = () => {
  const navigate = useNavigate();

  let token = localStorage.getItem("providerAccessToken");

  const newToken = JSON.parse(token);
  token = newToken?.providerAccessToken;

  useEffect(() => {
    const completeData = async () => {
      try {
        const response = await completeDatas()
      
        console.log(response);
        if (response.data.msg === "Complete your profile Data") {
          Swal.fire({
            title: "Profile Updation Pending!!",
            text: "Complete Your Profile Info",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Go to profile",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/provider/profileedit");
            }
          });
        }
      } catch (error) {
        console.error("Error completing data:", error);
      }
    };

    if (token) {
      completeData();
    }
  }, [navigate, token]);

  if (!token) return <Navigate to="/provider" />;

  return <div>Dashboard</div>;
};

export default Dashboard;
