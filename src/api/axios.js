import axios from "axios";

let url1 = "https://sona-backend-x0ae.onrender.com/api";
let url2 = "http://localhost:3000/api"
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