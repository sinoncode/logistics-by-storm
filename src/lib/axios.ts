import axios from "axios";
import { ENV } from "@/config/env";

const axiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem(
      "access_token"
    );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

export default axiosInstance;