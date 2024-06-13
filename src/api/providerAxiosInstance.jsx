import axios from "axios";

const route_url = import.meta.env.VITE_APP_NODE_ENV==="development"?import.meta.env.VITE_PROVIDER_ROUTE:import.meta.env.VITE_SERVER_PROVIDER_ROUTE

export const providerInstance = axios.create({
  baseURL: route_url ,
});

providerInstance.interceptors.request.use(
  (config) => {
    let providerToken = localStorage.getItem("providerAccessToken");
    const extractedToken = providerToken ? JSON.parse(providerToken).providerAccessToken : null;

    // const newProviderToken = JSON.parse(providerToken);
    // let extractedToken = newProviderToken?.providerAccessToken;

    if (extractedToken) {
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
