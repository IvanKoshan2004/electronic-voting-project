import axios from "axios";

axios.defaults.baseURL = "http://localhost:8888";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => response,
  error => {
    console.log(error.response.data.message);
    return { data: { success: error.response.data.success } };
  },
);

export const login = async userData => {
  const { data } = await axios.post("/auth/login", userData);
  return data;
};

export const register = async userData => {
  const { data } = await axios.post("/auth/register", userData);
  return data;
};

export const logout = async () => {
  const { data } = await axios.post("/auth/logout");
  return data;
};

export const currentAuth = async () => {
  const { data } = await axios.get("/auth/current");
  return data;
};
