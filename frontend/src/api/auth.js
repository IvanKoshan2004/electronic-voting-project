import axios from "axios";

axios.defaults.baseURL = "http://localhost:8888";
axios.defaults.withCredentials = true;

export const login = async userData => {
  try {
    const user = await axios.post("/auth/login", userData);
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

export const register = async userData => {
  try {
    const user = await axios.post("/auth/register", userData);
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = async () => {
  try {
    const { data } = await axios.post("/auth/logout");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
