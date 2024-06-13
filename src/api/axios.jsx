import axios from "axios";

const route_url = import.meta.env.VITE_APP_NODE_ENV==="development"?import.meta.env.
VITE_ADMIN_ROUTE :import.meta.env.
VITE_SERVER_ADMIN_ROUTE 

export const axiosInstance = axios.create({
  baseURL: route_url,
});


 



axiosInstance.interceptors.request.use(
  (config) => {
    // console.log("Welcome to axios interceptor request", config);
    const adminToken = localStorage.getItem("accessToken");
    const extractedToken = adminToken ? JSON.parse(adminToken).accessToken : null;

    if (extractedToken) {
      console.log("In auth token");
      config.headers.Authorization = `Bearer ${extractedToken}`;
    }
     
    return config;
  },
  (error) => {
    console.log("Error in Axios interceptor request", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Welcome to axios interceptor response===>", response);
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("Error in Axios interceptor response", error);
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem("accessToken");
      } else {
        console.log("Error:", error.response.data);
      }
    } else {
      console.log("Error:", error.message);
    }
    return Promise.reject(error);
  }
);
