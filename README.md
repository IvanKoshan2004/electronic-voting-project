# About

This is an electronic voting application based on blockchain.

## MVP Scope

### General description
The project includes login and registration pages. Each registered user can view and participate in active votings, as well as see the results of already completed ones.
The project includes pages for viewing lists of active and completed votings, a page with complete information for each ballot, and a page for creating new ballots.
When creating a ballot, the author specifies its name, description, list of candidates (from 2 to 10) and the time of completion of the ballot.
### Notes 
- every user can be an author;
- the author cannot participate in his ballots;
- for everyone except the author, only the final voting results are displayed.

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