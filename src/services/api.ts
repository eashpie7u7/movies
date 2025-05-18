import axios from "axios";
import Config from "@/config";

const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    newConfig.headers.Accept = "application/json";

    if (typeof window !== "undefined") {
      // Cliente: usa API key como query param
      newConfig.params = {
        ...newConfig.params,
        api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
      };
    } else {
      // Servidor: usa Authorization Bearer token
      newConfig.headers.Authorization = process.env.MOVIE_DB_ACCESS_TOKEN;
    }

    return newConfig;
  },
  (error) => Promise.reject(error)
);

export default api;
