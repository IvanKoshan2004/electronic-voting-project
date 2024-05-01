import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:8888";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = error.response?.data?.details?.message || error.response?.data?.message || "Error happened";
    toast(errorMessage);
    return { error };
  },
);

export const login = async userData => {
  const data = await axios.post("/auth/login", userData);
  return data;
};

export const register = async userData => {
  const data = await axios.post("/auth/register", userData);
  return data;
};

export const logout = async () => {
  const data = await axios.post("/auth/logout");
  return data;
};

export const currentAuth = async () => {
  const data = await axios.get("/auth/current");
  return data;
};
