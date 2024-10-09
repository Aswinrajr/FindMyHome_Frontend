import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoute = () => {
  const data =
    localStorage.getItem("providerAccessToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("userAccessToken");

  const token = JSON.parse(data);
  const role = token?.providerRole || token?.userRole || token?.adminRole;
  console.log("userRole Token", role);
  let userRole = "user";
  console.log("passed in", userRole === role);
  const accessGrand = userRole === role;

  if (!accessGrand) {
    console.log("Not allowedRoles provider===>:", role);
    if (role === "provider") {
      Swal.fire({
        icon: "error",
        title: "Unauthorized Access",
        text: "You are accessing an unauthorized route",
      });
      return <Navigate to="/provider/dashboard" replace />;
    }
    if (role === "admin") {
        Swal.fire({
          icon: "error",
          title: "Unauthorized Access",
          text: "You are accessing an unauthorized route",
        });
        return <Navigate to="/admin/dashboard" replace />;
      }
  }

  return <Outlet />;
};

export default ProtectedRoute;
