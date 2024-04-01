
import axios from 'axios';
import { Navigate } from 'react-router';
// import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate()

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ROUTE, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Iam in axios request")
    const token = localStorage.getItem('admin');
    console.log("Token in ewquest",token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response in admindashboard axios",response)
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
    //   navigate('/admin/login'); 
    return <Navigate to="/admin"></Navigate>
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
