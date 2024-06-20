import axios from "axios";

export const providerInstance = axios.create({
  baseURL: import.meta.env.VITE_PROVIDER_ROUTE,
});

providerInstance.interceptors.request.use(
  (config) => {
    let providerToken = localStorage.getItem("providerAccessToken");
    const extractedToken = providerToken
      ? JSON.parse(providerToken).providerAccessToken
      : null;

    if (extractedToken) {
    
      config.headers.Authorization = `Bearer ${extractedToken}`;
    }
    return config;
  },
  (error) => {
    console.log("Error in Axios interceptor request", error);
    return Promise.reject(error);
  }
);

providerInstance.interceptors.response.use(
  (response) => {
 
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("Error in Axios interceptor response", error);
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem("providerAccessToken");
      } else {
        console.error("Error:", error);
      }
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);
