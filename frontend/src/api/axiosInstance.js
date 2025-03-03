import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/jhire", // Change to your backend URL
  withCredentials: true, // Important: Enables cookies
});

export default api;
