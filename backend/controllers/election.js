import { createApiResponse } from "../helpers/createApiResponse.js";
import { electionFactoryService } from "../services/electionService.js";

const createElection = async (req, res, next) => {
  try {
    const { name, description, votingTimeInSeconds, candidateNames, creatorId } = req.body;
    const { id, createTime, endTime } = await electionFactoryService.createBallot(
      creatorId,
      name,
      description,
      votingTimeInSeconds,
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
