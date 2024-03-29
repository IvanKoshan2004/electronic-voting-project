import { Router } from "express";
import { electionFactoryService } from "../services/electionService.js";

const electionRouter = Router();

// election factory service usage showcase. this code is up to change
electionRouter.post("", async (req, res) => {
  try {
    await electionFactoryService.createBallot("name", "description", 3600, ["choice 1", "choice 2"]);
    const ballots = await electionFactoryService.getAllBallots();
    res.json({ data: ballots });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default electionRouter;
