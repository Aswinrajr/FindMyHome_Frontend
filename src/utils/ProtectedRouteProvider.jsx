import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRouteProvider = () => {
  const data = localStorage.getItem("providerAccessToken") || localStorage.getItem("accessToken") || localStorage.getItem("userAccessToken");

  const token = JSON.parse(data);
  const role = token?.providerRole || token?.userRole || token?.adminRole;
  console.log("provider Token", role);
  let providerRole = "provider";

  console.log("passed in", providerRole === role);
  const accessGrand = providerRole === role;

  if (!accessGrand) {
    console.log("Not allowedRoles provider===>:", role);
    if (role === "user") {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized Access',
        text: 'You are accessing an unauthorized route',
      });
      return <Navigate to="/" replace />;
    }
    if (role === "admin") {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized Access',
        text: 'You are accessing an unauthorized route',
      });
      return <Navigate to="/admin/dashboard" replace />;
    }
    
  }

  return <Outlet />;
};

export default ProtectedRouteProvider;
