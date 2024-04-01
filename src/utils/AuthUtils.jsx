export const checkAdminRole = () => {
  const userRole = localStorage.getItem("role");
  if (userRole === "user") {
    return userRole === "user";
  } else if (userRole === "Admin") {
    return userRole === "Admin";
  } else {
    return userRole === "provider";
  }
};
