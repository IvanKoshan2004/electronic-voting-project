// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract ElectionFactory {
    struct Candidate {
        uint8 id;
        string name;
    }

    struct Ballot {
        string name;
        string description;
        uint256 createTime;
        uint256 votingTime;
        Candidate[] candidates;
    }

    mapping(uint256 => Ballot) public ballots;
    uint256 public nextBallotId;

    event CandidateAdded(uint256 ballotId, uint8 id, string name);
    event ContractInitialized(uint256 ballotId, string name, string description, uint256 createTime, uint256 votingTime, Candidate[] candidates);

    function clearCandidates(uint256 _ballotId) internal {
        delete ballots[_ballotId].candidates; // just a precaution for any random data that might have left in array
    }

    function initialize(string memory _name, string memory _description, uint256 _votingTime, string[] memory _candidateNames) public {

        // check for a number of elements in given array (min. 2 candidates, max. - 10)
        require(_candidateNames.length >= 2 && _candidateNames.length <= 10, "Invalid number of candidates");

        uint256 ballotId = nextBallotId++;
        Ballot storage newBallot = ballots[ballotId];

        newBallot.name = _name;
        newBallot.description = _description;
        newBallot.createTime = block.timestamp;
        newBallot.votingTime = _votingTime; // takes the value of the voting lifetime in seconds

        clearCandidates(ballotId);

        for(uint i = 0; i < _candidateNames.length; i++) { // takes array of strings (candidate names) and converts it to array of structs (id + name)
            newBallot.candidates.push(Candidate(uint8(i), _candidateNames[i]));
            emit CandidateAdded(ballotId, uint8(i), _candidateNames[i]);
        }

        emit ContractInitialized(ballotId, _name, _description, newBallot.createTime, _votingTime, newBallot.candidates);
    }
}
