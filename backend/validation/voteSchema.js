import { z } from "zod";

export const voteSchema = z.object({
  candidateId: z.number({
    required_error: "Candidate ID is required",
    invalid_type_error: "Candidate ID must be number",
  }),
});
