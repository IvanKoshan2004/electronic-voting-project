import { ElectionFactoryContract } from "../lib/contracts.js";

function parseElectionFactoryEvent(receipt, eventName) {
  if (receipt && receipt.logs) {
    for (const log of receipt.logs) {
      const event = ElectionFactoryContract.interface.parseLog(log);
      if (event && event.name === eventName) {
        return event.args;
      }
    }
  }
}

class ElectionFactoryService {
  constructor() {}
  async createBallot(_creatorId, _name, _description, _votingTime, _candidateNames) {
    if (!_name) {
      throw Error("Name shouldn't be empty");
    }
    if (_candidateNames.length < 2 || _candidateNames.length > 10) {
      throw Error("Invalid candidate count");
    }
    if (_votingTime < 0) {
      throw Error("Voting time should not be less than 0");
    }
    try {
      const transaction = await ElectionFactoryContract.createBallot(
        _creatorId,
        _name,
        _description,
        _votingTime,
        _candidateNames,
      );
      const receipt = await transaction.wait();
      const ballotCreatedData = parseElectionFactoryEvent(receipt, "BallotCreated");
      const [id, createTime, endTime] = ballotCreatedData;
      return {
        id: Number(id),
        createTime: Number(createTime),
        endTime: Number(endTime),
      };
    } catch (e) {
      throw Error(e.reason || e.message);
    }
  }

  async hasVoted(_ballotId, _voterId) {
    try {
      const results = await ElectionFactoryContract.hasVoted(_ballotId, _voterId);
      return results;
    } catch (e) {
      throw Error(e.reason || e.message);
    }
  }

  async voteForCandidate(_ballotId, _candidateId, _voterId) {
    try {
      const transaction = await ElectionFactoryContract.voteForCandidate(_ballotId, _candidateId, _voterId);
      const receipt = await transaction.wait();
      const voteSuccess = parseElectionFactoryEvent(receipt, "VoteSuccess");
      if (voteSuccess) {
        return true;
      }
      return false;
    } catch (e) {
      throw Error(e.reason || e.message);
    }
  }

  async getAllBallots() {
    try {
      const results = await ElectionFactoryContract.getAllBallots();
      return results.map(result => {
        const [id, createTime, endTime, name, description, candidates] = result;
        return {
          id: Number(id),
          createTime: Number(createTime),
          endTime: Number(endTime),
          name,
          description,
          candidates: candidates.map(candidate => {
            const [id, name] = candidate;
            return {
              id: Number(id),
              name,
            };
          }),
        };
      });
    } catch (e) {
      throw Error(e.reason || e.message);
    }
  }

  async getBallotVotesById(_ballotId) {
    try {
      const results = await ElectionFactoryContract.getBallotVotesById(_ballotId);
      return results.map(result => {
        const [candidateId, votesCount] = result;
        return {
          candidateId: Number(candidateId),
          votesCount: Number(votesCount),
        };
      });
    } catch (e) {
      throw Error(e.reason || e.message);
    }
  }

  async getBallotShortInfoById(_ballotId) {
    try {
      const result = await ElectionFactoryContract.getBallotShortInfoById(_ballotId);
      const [id, createTime, endTime, creatorId, name, description, ended, winnerCandidate] = result;
      return {
        id: Number(id),
        createTime: Number(createTime),
        endTime: Number(endTime),
        creatorId: creatorId,
        name: name,
        description: description,
        ended: ended,
        winnerCandidate: Number(winnerCandidate),
      };
    } catch (e) {
      throw Error(e.reason || e.message);
    }
  }

  async getBallotWinner(_ballotId) {
    try {
      const result = await ElectionFactoryContract.getBallotWinner(_ballotId);
      return { winnerCandidate: Number(result) };
    } catch (e) {
      throw Error(e.reason || e.message);
    }
  }

  async getBallotCandidateById(_ballotId, _candidateId) {
    try {
      const result = await ElectionFactoryContract.getBallotCandidateById(_ballotId, _candidateId);
      const [candidateName] = result;
      return { candidateName };
    } catch (e) {
      throw Error(e.reason || e.message);
    }
  }

  async getBallotsCount() {
    try {
      const result = await ElectionFactoryContract.getBallotsCount();
      return { ballotCount: Number(result) };
    } catch (e) {
      throw Error(e.reason || e.message);
    }
  }

  async getCurrentBlockchainTimestamp() {
    try {
      const result = await ElectionFactoryContract.getCurrentBlockchainTimestamp();
      return { timestamp: Number(result) };
    } catch (e) {
      throw Error(e.reason || e.message);
    }
  }
}

export const electionFactoryService = new ElectionFactoryService();
