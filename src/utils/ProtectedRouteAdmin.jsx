import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRouteAdmin = () => {
  const data =
    localStorage.getItem("providerAccessToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("userAccessToken");

  const token = JSON.parse(data);
  const role = token?.providerRole || token?.userRole || token?.adminRole;
  console.log("proviadminder Token", role);
  let adminRole = "admin";

  console.log("passed in", adminRole === role);
  const accessGrand = adminRole === role;

  if (!accessGrand) {
    console.log("Not allowedRoles provider===>:", role);
    if (role === "user") {
      Swal.fire({
        icon: "error",
        title: "Unauthorized Access",
        text: "You are accessing an unauthorized route",
      });
      return <Navigate to="/" replace />;
    }
    if (role === "provider") {
        Swal.fire({
          icon: "error",
          title: "Unauthorized Access",
          text: "You are accessing an unauthorized route",
        });
        return <Navigate to="/provider/dashboard" replace />;
      }
  }

  return <Outlet />;
};

export default ProtectedRouteAdmin;
