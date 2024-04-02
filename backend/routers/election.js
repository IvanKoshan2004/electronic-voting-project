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
electionRouter.get("/", () => {
  console.log("get");
});

export default electionRouter;
