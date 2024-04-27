import { createApiResponse } from "../helpers/createApiResponse.js";
import { blockchainClock } from "../services/BlockchainClock.js";
import { electionFactoryService } from "../services/electionService.js";
import { toMilisecondsFromSeconds } from "../helpers/timeHelpers.js";

const createElection = async (req, res, next) => {
  try {
    const { name, description, votingTimeInSeconds, candidateNames } = req.body;
    const { id: userId } = req.user;
    const { id, createTime, endTime } = await electionFactoryService.createBallot(
      userId,
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
        createTime: toMilisecondsFromSeconds(createTime),
        endTime: toMilisecondsFromSeconds(endTime),
      }),
    );
  } catch (e) {
    return next(e);
  }
};

const getActiveElections = async (req, res, next) => {
  const elections = await electionFactoryService.getAllBallots();
  const timestamp = blockchainClock.getTimestamp();
  const filteredElections = elections.filter(election => {
    if (election.ended) {
      return false;
    }
    if ((toMilisecondsFromSeconds(election.endTime) - timestamp) / 1000 < 1) {
      return false;
    }

    return true;
  });
  return res.send(
    createApiResponse({
      elections: filteredElections.map(election => {
        return {
          ...election,
          createTime: toMilisecondsFromSeconds(election.createTime),
          endTime: toMilisecondsFromSeconds(election.endTime),
          timeTillEndInSeconds: (toMilisecondsFromSeconds(election.endTime) - timestamp) / 1000,
        };
      }),
    }),
  );
};

const getInactiveElections = async (req, res, next) => {
  const elections = await electionFactoryService.getAllBallots();
  const timestamp = blockchainClock.getTimestamp();
  const filteredElections = elections.filter(election => {
    if (election.ended) {
      return true;
    }
    if ((toMilisecondsFromSeconds(election.endTime) - timestamp) / 1000 <= 0) {
      return true;
    }

    return false;
  });
  return res.send(
    createApiResponse({
      elections: filteredElections.map(election => {
        return {
          ...election,
          createTime: toMilisecondsFromSeconds(election.createTime),
          endTime: toMilisecondsFromSeconds(election.endTime),
        };
      }),
    }),
  );
};

export default { createElection, getActiveElections, getInactiveElections };
