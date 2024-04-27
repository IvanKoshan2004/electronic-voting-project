import axios from "axios";

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
