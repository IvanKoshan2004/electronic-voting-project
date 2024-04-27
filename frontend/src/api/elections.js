import axios from "axios";

export const createElection = async electionData => {
  const result = await axios.post("/election/create-election", electionData);
  return result;
};

export const getActiveElections = async () => {
  const result = await axios.get("/election/active-elections");
  return result;
};

export const getInactiveElections = async () => {
  const result = await axios.get("/election/inactive-elections");
  return result;
};
