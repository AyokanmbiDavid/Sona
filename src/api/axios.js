import { meta } from "@eslint/js";
import axios from "axios";

let url1 = import.meta.env.VITE_BACKEND_URI;
let url2 = import.meta.env.VITE_LOCAL_URI;

const api = axios.create({
  baseURL: url1,
});

// Add interceptor to include the token in every request
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;