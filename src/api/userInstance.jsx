import axios from "axios";

let userToken = localStorage.getItem("userToken");

const newUserToken = JSON.parse(userToken);
let extractedToken = newUserToken?.userToken;

export const userInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ROUTE,

});

userInstance.interceptors.request.use(
  (config) => {
    if (userToken) {
      console.log("In user Instance");
      config.headers.Authorization = `Bearer ${extractedToken}`;
    }
    return config;
  },
  (error) => {
    console.log("Error in Axios interceptor request", error);
    return Promise.reject(error);
  }
);

userInstance.interceptors.response.use(
  (response) => {
    console.log("Welcome to user axios interceptor response===>", response);
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("Error in Axios interceptor response", error);
      const { status } = error.response;
      if (status === 401) {
        // localStorage.removeItem("extractedToken");
      } else {
        console.error("Error:", error);
      }
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);
