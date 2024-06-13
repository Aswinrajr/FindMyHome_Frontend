import axios from "axios";

export const userInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ROUTE

});
     

userInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("userAccessToken");
    const extractedToken = userToken ? JSON.parse(userToken).userAccessToken : null;
    if (extractedToken) {
      console.log("In user Instance",extractedToken);
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
        localStorage.removeItem("extractedToken");
      } else {
        console.error("Error:", error);
      }
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);
