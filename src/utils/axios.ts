import axios from "axios";
import { useAutenticacionStore } from "../stores/autenticacion";

const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_API
});

axiosAPI.interceptors.request.use((config) => {
  const token = useAutenticacionStore.getState().jwt;
  
  if(token){
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    } as any;
  }

  return config;
})

export default axiosAPI;