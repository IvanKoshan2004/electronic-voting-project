import { Router } from "express";
import electionController from "../controllers/election.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { electionSchema } from "../validation/electionSchema.js";
import { validateBody } from "../middlewares/validateBody.js";
import { electionFactoryService } from "../services/electionService.js";
import { createApiResponse } from "../helpers/createApiResponse.js";
import { blockchainClock } from "../services/BlockchainClock.js";

const electionRouter = Router();

electionRouter.post(
  "/create-election",
  isAuthenticated,
  validateBody(electionSchema),
  electionController.createElection,
);

electionRouter.get("/active-elections", isAuthenticated, electionController.getActiveElections);

electionRouter.get("/inactive-elections", isAuthenticated, electionController.getInactiveElections);

export default electionRouter;
