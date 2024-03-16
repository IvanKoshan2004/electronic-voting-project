import { Router } from "express";
import { ElectionFactoryContract } from "../lib/contracts.js";

const electionRouter = Router();

electionRouter.post("", async (req, res) => {
  const { electionName } = req.query;
  console.log("Election name in query: ", electionName);

  const transaction = await ElectionFactoryContract.createElection(electionName);
  console.log(transaction);
  await transaction.wait();

  const electionNamesView = await ElectionFactoryContract.getAllElectionNames();
  console.log(electionNamesView);

  res.json({ data: electionNamesView });
});

export default electionRouter;
