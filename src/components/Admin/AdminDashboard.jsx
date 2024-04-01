// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";


// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const admin = localStorage.getItem("admin");

//   if (admin) {
//     console.log("Welcome to dashboard", admin);
//   }

//   useEffect(() => {
//     if (!admin) {
//       navigate("/admin/login", {
//         state: { message: "Please log in to access the admin dashboard." },
//       });
//     }
//   }, [admin]);

//   return <div>Admin Dashboard</div>;
// };

// export default AdminDashboard;




import  { useEffect } from 'react';
import { checkAdminRole } from "../../utils/AuthUtils"
import {  useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate()
  const newRole = checkAdminRole()
  console.log("New Rolw",newRole)
  useEffect(() => {
    if (!checkAdminRole()) {
      navigate('/admin');
    }
  }, []);

  return <div>Admin Dashboard</div>;
};

export default AdminDashboard;
