import { createApiResponse } from "../helpers/createApiResponse.js";
import { electionFactoryService } from "../services/electionService.js";

const createElection = async (req, res, next) => {
  try {
    const { name, description, time, candidates } = req.body;
    await electionFactoryService.createBallot(name, description, time, candidates);
    const ballots = await electionFactoryService.getAllBallots();
    console.log(ballots);
    return res.send(createApiResponse(ballots));
  } catch (e) {
    return next(error);
  }
};

export default { createElection };
