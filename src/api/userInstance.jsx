import axios from "axios";

export const userInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ROUTE

});
     

userInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("userAccessToken");
    const extractedToken = userToken ? JSON.parse(userToken).userAccessToken : null;
    if (extractedToken) {
 
      config.headers.Authorization = `Bearer ${extractedToken}`;
    }
    return config;
  },
  (error) => {
 
    return Promise.reject(error);
  }
);
userInstance.interceptors.response.use(
  (response) => {

    return response;
  },
  (error) => {
    if (error.response) {
    
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem("extractedToken");
      } 
    } 
    return Promise.reject(error);
  }
);
