//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract ElectionFactory {
       
    struct Candidate {
        uint8 id;
        string name;
    }

    string public name;
    string public description;
    uint256 public createTime;
    uint256 public votingTime;
    Candidate[] public candidates;

    function clearCandidates() internal {
        delete candidates; // just a precaution for any random data that might have left in array
    }

    event CandidateAdded(uint8 id, string name);
    event ContractInitialized(string name, string description, uint256 createTime, uint256 votingTime, Candidate[] candidates);

    function initialize(string memory _name, string memory _description, uint256 _votingTime, string[] memory _candidateNames) public {
        
        // check for a number of elements in given array (min. 2 candidates, max. - 10)
        require(_candidateNames.length >= 2 && _candidateNames.length <= 10, "Invalid number of candidates");

        name = _name;
        description = _description;
        createTime = block.timestamp; // time of the voting creation in the Unix format (seconds since January 1, 1970)
        votingTime = _votingTime; // takes the value of the voting lifetime in seconds

        clearCandidates();

        for(uint i = 0; i < _candidateNames.length; i++) { // takes array of strings (candidate names) and converts it to array of structs (id + name)
            candidates.push(Candidate(uint8(i), _candidateNames[i]));
            emit CandidateAdded(uint8(i), _candidateNames[i]);
        }

        emit ContractInitialized(_name, _description, createTime, _votingTime, candidates);
    }
}