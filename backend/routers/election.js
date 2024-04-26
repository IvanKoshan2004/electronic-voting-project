import { Router } from "express";
import electionController from "../controllers/election.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { electionSchema } from "../validation/electionSchema.js";
import { validateBody } from "../middlewares/validateBody.js";
import { electionFactoryService } from "../services/electionService.js";
import { createApiResponse } from "../helpers/createApiResponse.js";

const electionRouter = Router();

electionRouter.post(
  "/create-election",
  isAuthenticated,
  validateBody(electionSchema),
  electionController.createElection,
);

electionRouter.get("/active-elections", async (req, res, next) => {
  const elections = await electionFactoryService.getAllBallots();
  const { timestamp } = await electionFactoryService.getCurrentBlockchainTimestamp();
  console.log(timestamp, "blockchain timestamp");
  const filteredElections = elections.filter(election => {
    console.log(election.endTime - timestamp, "election.endTime - timestamp");
    return false;
  });
  return res.send(
    createApiResponse({
      filteredElections,
    }),
  );
});

electionRouter.get("inactive-elections", async (req, res, next) => {
  const elections = await electionFactoryService.getAllBallots();
  const filteredElections = elections.filter(election => election.ended);
  return res.send(
    createApiResponse({
      filteredElections,
    }),
  );
});

export default electionRouter;
