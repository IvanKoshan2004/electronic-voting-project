import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(1)
    .refine(val => /^[a-zA-Z]+$/.test(val), { message: "Username can contain only letters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must contain at least 6 characters" }),
});

export const electionSchema = z.object({
  name: z.string({ required_error: "Election name is required" }).min(1),
  description: z.string("Desciption must be string").optional(),
  time: z.number("Time is required and must be a number"),
  candidates: z.array(z.string("Candidate name is required and has to be string")),
});
