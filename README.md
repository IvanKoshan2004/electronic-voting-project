# About

This is an electronic voting application based on blockchain.

## MVP Scope

### General description
The project includes authentication system. Each registered user can create, view and participate in active votings, as well as see the results of already completed ones.
Ballots are stored in smart contracts and are immutable.
The project includes pages for viewing lists of active and completed votings, a page with complete information for each ballot, and a page for creating new ballots.
The system automatically determines when votings end by time and moves them to the Completed tab.

### Notes 
- user information is stored in MongoDB;
- voting data is stored in a smart contract;
- every user can be an author;
- the author cannot participate in his ballots;
- when creating a ballot, the author specifies its name, description, list of candidates (from 2 to 10) and the time of completion of the ballot;
- users can see the winner only after the end of voting;
- the author sees the voting results dynamically while the ballot is still active.

### Tech stack
- Frontend
    - React
    - [Figma](https://www.figma.com/file/L5UR15GuqTMCm9LDI6Y0Gz/blockchain-voting-webapp-pages-design) for pages layouts design
- Backend
    - MongoDB
    - Node.JS
    - Solidity :shipit:

## How to run

### Frontend

1. `cd` into `frontend`
2. run `npm install` to install dependencies
3. run `npm run dev` to run the application in dev mode

### Backend

1. `cd` into `backend`
2. run `npm install` to install dependencies
3. follow the [docs](./docs/MONGO.md) on how to setup MongoDB environment.
4. follow the [docs](./docs/HARDHAT.md) on how to setup blockchain dev environment.
5. run `npm run start` or `npm run start:dev` to start the server