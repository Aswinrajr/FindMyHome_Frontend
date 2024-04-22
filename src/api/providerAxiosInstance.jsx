import axios from "axios";

export const providerInstance = axios.create({
  baseURL: import.meta.env.VITE_PROVIDER_ROUTE ,
});


let providerToken = localStorage.getItem("providerAccessToken");

const newProviderToken = JSON.parse(providerToken);
let extractedToken = newProviderToken?.providerAccessToken;



providerInstance.interceptors.request.use(
  (config) => {
   

    if (providerToken) {
      console.log("In provider token");
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
    console.log("Welcome to axios interceptor response===>", response);
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
