import { z } from "zod";

export const electionSchema = z.object({
  userId: z.string({ required_error: "Creator ID is required" }),
  name: z.string({ required_error: "Election name is required" }).min(1),
  description: z.string("Description must be string").optional(),
  votingTimeInSeconds: z
    .number({ required_error: "Voting time is required and must be a number" })
    .nonnegative("Time can't be negative"),
  candidateNames: z
    .array(z.string({ required_error: "Candidate name is required and has to be string" }))
    .min(2)
    .max(10),
});
