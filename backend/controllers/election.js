import { createApiResponse } from "../helpers/createApiResponse.js";
import { electionFactoryService } from "../services/electionService.js";

const createElection = async (req, res, next) => {
  try {
    const { name, description, votingTime, candidateNames } = req.body;
    const { id, createTime, endTime } = await electionFactoryService.createBallot(
      name,
      description,
      votingTime,
      candidateNames,
    );

    return res.send(
      createApiResponse({
        id,
        name,
        description,
        candidateNames,
        createTime,
        endTime,
      }),
    );
  } catch (e) {
    return next(error);
  }
};

export default { createElection };
