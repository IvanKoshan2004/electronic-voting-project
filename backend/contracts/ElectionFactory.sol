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

    mapping(uint256 => Ballot) public ballots;
    uint256 public nextBallotId;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender; // get address of the contract deployer
        nextBallotId = 0;
    }

    function createBallot(string memory _name, string memory _description, uint256 _votingTime, string[] memory _candidateNames) public onlyOwner {

        // check for a number of elements in given array (min. 2 candidates, max. - 10)
        require(_candidateNames.length >= 2 && _candidateNames.length <= 10, "Invalid number of candidates");

        Ballot storage newBallot = ballots[nextBallotId];

        newBallot.id = nextBallotId++;
        newBallot.name = _name;
        newBallot.description = _description;
        newBallot.createTime = block.timestamp;
        newBallot.endTime = newBallot.createTime + _votingTime;

        for(uint i = 0; i < _candidateNames.length; i++) { // takes array of strings (candidate names) and converts it to array of structs (id + name)
            newBallot.candidates.push(Candidate(uint8(i), _candidateNames[i]));
        }
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
