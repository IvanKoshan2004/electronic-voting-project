// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract ElectionFactory {
    address public owner;

    struct Candidate {
        uint8 id;
        string name;
    }

    struct Ballot {
        uint256 id;
        uint256 createTime;
        uint256 endTime;
        string name;
        string description;
        Candidate[] candidates;
    }

    struct BallotVotes {
        string[] voters;
        mapping(uint8 => uint256) voteCounts;
    }

    mapping(uint256 => Ballot) public ballots;
    mapping(uint256 => BallotVotes) internal ballotsVotes;

    uint256 public nextBallotId;
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender; // get address of the contract deployer
        nextBallotId = 0;
    }

    event BallotCreated(uint256 _id, uint256 _createTime, uint256 _endTime);

    function createBallot(string memory _name, string memory _description, uint256 _votingTime, string[] memory _candidateNames) public onlyOwner {

        // check for a number of elements in given array (min. 2 candidates, max. - 10)
        require(_candidateNames.length >= 2 && _candidateNames.length <= 10, "Invalid number of candidates");

        Ballot storage newBallot = ballots[nextBallotId];

        newBallot.id = nextBallotId++;
        newBallot.name = _name;
        newBallot.description = _description;
        newBallot.createTime = block.timestamp;
        newBallot.endTime = newBallot.createTime + _votingTime;

        for (uint i = 0; i < _candidateNames.length; i++) { // takes array of strings (candidate names) and converts it to array of structs (id + name)
            newBallot.candidates.push(Candidate(uint8(i), _candidateNames[i]));
        }

        emit BallotCreated(newBallot.id, newBallot.createTime, newBallot.endTime);
    }

    event VoteSuccess();
    event VoteFail();

    function voteForCandidate(uint256 ballotId, uint8 candidateId, string memory voterId) public onlyOwner() {
        require(ballots[ballotId].endTime < block.timestamp, "Can't vote after election has ended");

        bool hasVoted = false;
        for (uint256 i = 0; i < ballotsVotes[ballotId].voters.length; i++) {
            if (keccak256(bytes(ballotsVotes[ballotId].voters[i])) == keccak256(bytes(candidateId))) {
                hasVoted = true;
                break;
            }
        }

        // If the candidate hasn't voted yet, record the vote
        if (!hasVoted) {
            ballotsVotes[ballotId].voteCounts[candidateId]++;
            ballotsVotes[ballotId].voters.push(voterId);
            emit VoteSuccess();
        }
        else {
            emit VoteFail();
        }
    }
    struct CandidateVotes {
        uint8 candidateId;
        uint256 votesCount;
    }

    function getBallotVotes(uint256 ballotId) public view onlyOwner() returns (CandidateVotes[] memory) {
        uint256 candidateCount = ballots[ballotId].candidates.length;
        CandidateVotes[] memory allCandidateVotes = new CandidateVotes[](candidateCount);
        for (uint256 i = 0; i < candidateCount; i++) {
            Candidate memory candidate = ballots[ballotId].candidates[i];
            allCandidateVotes[i] = CandidateVotes(candidate.id, ballotsVotes[ballotId].voteCounts[candidate.id]);
        }
        return allCandidateVotes;
    }

    // Demonstration function
    function getAllBallots() public view returns (Ballot[] memory) {
        Ballot[] memory allBallots = new Ballot[](nextBallotId - 1);

        for (uint256 i = 1; i < nextBallotId; i++) {
            allBallots[i - 1] = ballots[i];
        }

        return allBallots;
    }
}
