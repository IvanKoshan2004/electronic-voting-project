import { createApiResponse } from "../helpers/createApiResponse.js";
import { electionFactoryService } from "../services/electionService.js";

const createElection = async (req, res, next) => {
  try {
    const { name, description, votingTime, candidateNames } = req.body;
    await electionFactoryService.createBallot(name, description, votingTime, candidateNames);

    return res.send(createApiResponse(req.body));
  } catch (e) {
    return next(error);
  }
};

export default { createElection };
