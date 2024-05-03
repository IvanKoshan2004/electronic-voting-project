import { Router } from "express";
import electionController from "../controllers/election.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { electionSchema } from "../validation/electionSchema.js";
import { validateBody } from "../middlewares/validateBody.js";
import { voteSchema } from "../validation/voteSchema.js";

const electionRouter = Router();

electionRouter.post(
  "/create-election",
  isAuthenticated,
  validateBody(electionSchema),
  electionController.createElection,
);

electionRouter.get("/my-elections", isAuthenticated, electionController.getMyElections);

electionRouter.get("/active-elections", isAuthenticated, electionController.getActiveElections);

electionRouter.get("/inactive-elections", isAuthenticated, electionController.getInactiveElections);

electionRouter.get("/:electionId", isAuthenticated, electionController.getElectionById);

electionRouter.post("/:electionId/vote", isAuthenticated, validateBody(voteSchema), electionController.voteForElection);

export default electionRouter;
