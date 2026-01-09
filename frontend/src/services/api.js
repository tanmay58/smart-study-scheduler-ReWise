import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "https://rewise-backend.onrender.com/api",

});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
