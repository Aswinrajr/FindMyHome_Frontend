import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ROUTE,
});

let authToken = localStorage.getItem("accessToken");


const newToken = JSON.parse(authToken);
let token = newToken?.accessToken;




axiosInstance.interceptors.request.use(
  (config) => {
    // console.log("Welcome to axios interceptor request", config);

    if (authToken) {
      console.log("In auth token");
      config.headers.Authorization = `Bearer ${token}`;
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
