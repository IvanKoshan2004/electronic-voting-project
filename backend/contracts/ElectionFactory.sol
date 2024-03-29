// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract ElectionFactory {
    address public owner;

    struct Candidate {
        uint8 id;
        string name;
    }

    struct Ballot {
        string name;
        string description;
        uint256 createTime;
        uint256 endTime;
        Candidate[] candidates;
    }

    mapping(uint256 => Ballot) public ballots;
    uint256 public nextBallotId;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender; // get address of the contract deployer
    }

    function createBallot(string memory _name, string memory _description, uint256 _votingTime, string[] memory _candidateNames) public onlyOwner {

        // check for a number of elements in given array (min. 2 candidates, max. - 10)
        require(_candidateNames.length >= 2 && _candidateNames.length <= 10, "Invalid number of candidates");

        uint256 ballotId = nextBallotId++;
        Ballot storage newBallot = ballots[ballotId];

        newBallot.name = _name;
        newBallot.description = _description;
        newBallot.createTime = block.timestamp;
        newBallot.endTime = newBallot.createTime + _votingTime;

        for(uint i = 0; i < _candidateNames.length; i++) { // takes array of strings (candidate names) and converts it to array of structs (id + name)
            newBallot.candidates.push(Candidate(uint8(i), _candidateNames[i]));
        }
    }
}
