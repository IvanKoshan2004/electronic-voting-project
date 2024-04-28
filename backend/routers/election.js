import { Router } from "express";
import electionController from "../controllers/election.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { electionSchema } from "../validation/electionSchema.js";
import { validateBody } from "../middlewares/validateBody.js";

const electionRouter = Router();

electionRouter.post(
  "/create-election",
  isAuthenticated,
  validateBody(electionSchema),
  electionController.createElection,
);

electionRouter.get("/active-elections", isAuthenticated, electionController.getActiveElections);

electionRouter.get("/inactive-elections", isAuthenticated, electionController.getInactiveElections);

electionRouter.get("/:electionId", isAuthenticated, electionController.getElectionById);

export default electionRouter;
