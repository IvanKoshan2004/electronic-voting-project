import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ required_error: "Username us required" })
    .min(1)
    .refine(val => /^[a-zA-Z]+$/.test(val), { message: "Username can contain only letters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must contain at least 6 characters" }),
});
