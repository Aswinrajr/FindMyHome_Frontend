import { Navigate } from "react-router";

const AdminDashboard = () => {
  const token = localStorage.getItem("accessToken");
  console.log("Accesstoken",token)
  if (!token) return <Navigate to="/admin" />;
  return <div>Admin Dashboard</div>;
};

export default AdminDashboard;
