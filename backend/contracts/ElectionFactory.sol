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
        string creatorId;
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

    function createBallot(string memory _creatorId, string memory _name, string memory _description, uint256 _votingTime, string[] memory _candidateNames) public onlyOwner {

        // check for a number of elements in given array (min. 2 candidates, max. - 10)
        require(_candidateNames.length >= 2 && _candidateNames.length <= 10, "Invalid number of candidates");

        Ballot storage newBallot = ballots[nextBallotId];

        newBallot.id = nextBallotId++;
        newBallot.name = _name;
        newBallot.description = _description;
        newBallot.createTime = block.timestamp;
        newBallot.endTime = newBallot.createTime + _votingTime;
        newBallot.creatorId = _creatorId;

        for (uint i = 0; i < _candidateNames.length; i++) { // takes array of strings (candidate names) and converts it to array of structs (id + name)
            newBallot.candidates.push(Candidate(uint8(i), _candidateNames[i]));
        }

        emit BallotCreated(newBallot.id, newBallot.createTime, newBallot.endTime);
    }

    event VoteSuccess();

    function hasVoted(uint256 _ballotId, string memory _voterId) public view onlyOwner() returns (bool) {
        for (uint256 i = 0; i < ballotsVotes[_ballotId].voters.length; i++) {
            if (keccak256(bytes(ballotsVotes[_ballotId].voters[i])) == keccak256(bytes(_voterId))) {
                return true;
            }
        }
        return false;
    }

    function voteForCandidate(uint256 _ballotId, uint8 _candidateId, string memory _voterId) public onlyOwner() {
        require(keccak256(bytes(_voterId)) != keccak256(bytes(ballots[_ballotId].creatorId)), "Creator cannot vote");
        require(!hasVoted(_ballotId, _voterId), "Voter has already voted");
        require(ballots[_ballotId].endTime > block.timestamp, "Cannot vote after election has ended");

        ballotsVotes[_ballotId].voteCounts[_candidateId]++;
        ballotsVotes[_ballotId].voters.push(_voterId);
        emit VoteSuccess();
    }

    struct CandidateVotes {
        uint8 candidateId;
        uint256 votesCount;
    }

    function getBallotVotesById(uint256 _ballotId) public view onlyOwner() returns (CandidateVotes[] memory) {
        uint256 candidateCount = ballots[_ballotId].candidates.length;
        CandidateVotes[] memory allCandidateVotes = new CandidateVotes[](candidateCount);
        for (uint256 i = 0; i < candidateCount; i++) {
            Candidate memory candidate = ballots[_ballotId].candidates[i];
            allCandidateVotes[i] = CandidateVotes(candidate.id, ballotsVotes[_ballotId].voteCounts[candidate.id]);
        }
        return allCandidateVotes;
    }

    struct BallotInfo {
        uint256 id;
        uint256 createTime;
        uint256 endTime;
        string creatorId;
        string name;
        string description;  
        bool ended;
        Candidate[] candidates;
        uint8 winnerCandidate;
    }

    function getBallotInfoById(uint256 _ballotId) public view returns (BallotInfo memory) {
        BallotInfo memory info;
        info.id = ballots[_ballotId].id;
        info.createTime = ballots[_ballotId].createTime;
        info.endTime = ballots[_ballotId].endTime;
        info.creatorId = ballots[_ballotId].creatorId;
        info.name = ballots[_ballotId].name;
        info.description = ballots[_ballotId].description;
        info.ended = ballots[_ballotId].endTime < block.timestamp;
        info.candidates = ballots[_ballotId].candidates;
        if (info.ended) {
            info.winnerCandidate = getBallotWinner(ballots[_ballotId].id);
        }
        return info;
    }

    struct BallotShortInfo {
        uint256 id;
        uint256 createTime;
        uint256 endTime;
        string creatorId;
        string name;
        string description;  
        bool ended;
        uint8 winnerCandidate;
    }

    function getAllBallots() public view returns (BallotShortInfo[] memory) {
        BallotShortInfo[] memory ballotsInfo = new BallotShortInfo[](nextBallotId);

        for (uint256 i = 0; i < nextBallotId; i++) {
            BallotShortInfo memory info;
            info.id = ballots[i].id;
            info.createTime = ballots[i].createTime;
            info.endTime = ballots[i].endTime;
            info.creatorId = ballots[i].creatorId;
            info.name = ballots[i].name;
            info.description = ballots[i].description;
            info.ended = ballots[i].endTime < block.timestamp;
            if (info.ended) {
                info.winnerCandidate = getBallotWinner(ballots[i].id);
            }
            ballotsInfo[i] = info;
        }

        return ballotsInfo;
    }
    function getBallotWinner(uint256 _ballotId) public view returns (uint8) {
        require(ballots[_ballotId].endTime < block.timestamp, "Ballot has not ended yet");

        uint256 candidateCount = ballots[_ballotId].candidates.length;
        uint256 maxVotes = 0;
        uint8 maxVotesId = 255;
        for (uint256 i = 0; i < candidateCount; i++) {
            Candidate memory candidate = ballots[_ballotId].candidates[i];
            uint256 currentVotes = ballotsVotes[_ballotId].voteCounts[candidate.id];
            if (currentVotes >= maxVotes) {
                maxVotes = currentVotes;
                maxVotesId = candidate.id;
            }
        }
        return maxVotesId;
    }
    function getBallotCandidateById(uint256 _ballotId, uint8 _candidateId) public view returns (string memory) {
        return ballots[_ballotId].candidates[_candidateId].name;
    }
    function getBallotsCount() public view returns (uint256) {
        return nextBallotId;
    }
    
    // start transaction to mine a new block to get current timestamp
    uint256 timestampCount = 0;
    event GetTimestamp(uint256 timestamp);
    function getCurrentBlockchainTimestamp() public {
        timestampCount = timestampCount + 1;
        emit GetTimestamp(block.timestamp);
    }
}
