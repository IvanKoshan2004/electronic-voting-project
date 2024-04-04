import { z } from "zod";

export const electionSchema = z.object({
  name: z.string({ required_error: "Election name is required" }).min(1),
  description: z.string("Desciption must be string").optional(),
  votingTime: z.number("Voting time is required and must be a number"),
  candidateNames: z.array(z.string("Candidate name is required and has to be string")),
});
