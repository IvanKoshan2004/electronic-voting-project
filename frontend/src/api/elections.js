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

export const createElection = async electionData => {
  const { data } = await axios.post("/election/create-election", electionData);
  return data;
};

export const getActiveElections = async () => {
  const { data } = await axios.get("/election/active-elections");
  return data.elections;
};

export const getInactiveElections = async () => {
  const { data } = await axios.get("/election/inactive-elections");
  return data.elections;
};
