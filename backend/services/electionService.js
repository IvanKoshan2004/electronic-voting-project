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
  async createBallot(_name, _description, _votingTime, _candidateNames) {
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
      const transaction = await ElectionFactoryContract.createBallot(_name, _description, _votingTime, _candidateNames);
      const receipt = await transaction.wait();
      const ballotCreatedData = parseElectionFactoryEvent(receipt, "BallotCreated");
      const [id, createTime, endTime] = ballotCreatedData;
      return {
        id: Number(id),
        createTime: Number(createTime),
        endTime: Number(endTime),
      };
    } catch (e) {
      throw Error("Blockchain error");
    }
  }
  async getAllBallots() {
    const results = await ElectionFactoryContract.getAllBallots();
    const ballots = results.map(result => {
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
    return ballots;
  }
}

export const electionFactoryService = new ElectionFactoryService();
