import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ROUTE,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Welcome to axios interceptor request", config);
    let authToken = localStorage.getItem("accessToken");
    let providerToken = localStorage.getItem("providerAccessToken")
    const newProviderToken = JSON.parse(providerToken)
    const newToken =JSON.parse(authToken)

    let extractedToken = newProviderToken?.providerAccessToken
    let token = newToken?.accessToken
    console.log("New Token",token)
    if (authToken) {
      config.headers.Authorization = `Bearer ${token}`;
    }else if(providerToken){
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
        console.error("Error:", error.response.data);
      }
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);
