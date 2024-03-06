import dotenv from "dotenv";
import { z } from "zod";

dotenv.config("./env.js");

export const env = z
  .object({
    APP_PORT: z.string().refine(val => /^[0-9]+$/.test(val)),
    DATABASE_URL: z.string(),
  })
  .parse(process.env);
