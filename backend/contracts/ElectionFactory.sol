//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract ElectionFactory {
    struct Election {
        string name;
    }

    Election[] public elections;

    constructor() {
    }

    function createElection(string memory _name) external{
        Election memory newElection = Election(_name);
        elections.push(newElection);
    }

    function getAllElectionNames() external view returns (string[] memory) {
        uint256 length = elections.length;
        string[] memory names = new string[](length);
        for (uint256 i = 0; i < length; i++) {
            names[i] = elections[i].name;
        }
        return names;
    }
}