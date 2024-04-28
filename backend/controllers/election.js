import { createApiResponse } from "../helpers/createApiResponse.js";
import { blockchainClock } from "../services/BlockchainClock.js";
import { electionFactoryService } from "../services/electionService.js";
import { toMilisecondsFromSeconds } from "../helpers/timeHelpers.js";
import { prisma } from "../lib/db.js";

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

  const allDataElections = await Promise.all(
    filteredElections.map(async election => {
      try {
        const { username } = await prisma.user.findFirst({ where: { id: election.creatorId } });
        const isVoted = await electionFactoryService.hasVoted(election.id, req.user.id);

        return {
          ...election,
          createTime: toMilisecondsFromSeconds(election.createTime),
          endTime: toMilisecondsFromSeconds(election.endTime),
          creatorName: username,
          isVoted,
          timeTillEndInSeconds: (toMilisecondsFromSeconds(election.endTime) - timestamp) / 1000,
        };
      } catch (error) {
        console.log(error);
      }
    }),
  );

  return res.send(
    createApiResponse({
      elections: allDataElections,
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

  const allDataElections = await Promise.all(
    filteredElections.map(async election => {
      try {
        const { username } = await prisma.user.findFirst({ where: { id: election.creatorId } });
        const isVoted = await electionFactoryService.hasVoted(election.id, req.user.id);
        const { candidateName } = await electionFactoryService.getBallotCandidateById(
          election.id,
          election.winnerCandidate,
        );

        return {
          ...election,
          createTime: toMilisecondsFromSeconds(election.createTime),
          endTime: toMilisecondsFromSeconds(election.endTime),
          creatorName: username,
          isVoted,
          winnerCandidate: candidateName,
        };
      } catch (error) {
        console.log(error);
      }
    }),
  );

  return res.send(
    createApiResponse({
      elections: allDataElections,
    }),
  );
};

const getElectionById = async (req, res, next) => {
  const { electionId } = req.params;
  const { id: userId } = req.user;
  const election = await electionFactoryService.getBallotInfoById(electionId);
  const { username } = await prisma.user.findFirst({ where: { id: election.creatorId } });
  const totalVotes = await electionFactoryService.getBallotVotesById(electionId);
  const hasVoted = await electionFactoryService.hasVoted(electionId, userId);
  const isOwner = userId === election.creatorId;

  const candidatesWithVotes = election.candidates.map(candidate => {
    const { votesCount } = totalVotes.find(vote => vote.candidateId === candidate.id);
    return {
      ...candidate,
      votesCount,
    };
  });

  return res.send(
    createApiResponse({
      election: {
        ...election,
        creatorName: username,
        candidates: election.ended || isOwner ? candidatesWithVotes : election.candidates,
        hasVoted,
        isOwner,
      },
    }),
  );
};

export default { createElection, getActiveElections, getInactiveElections, getElectionById };
