import express, { json } from "express";
import authRouter from "./routers/auth.js";
import userRouter from "./routers/user.js";
import electionRouter from "./routers/election.js";
import env from "./lib/env.cjs";
import cookieParser from "cookie-parser";
import { handleError } from "./middlewares/handleError.js";
import cors from "cors";
import { createApiResponse } from "./helpers/createApiResponse.js";

const APP_PORT = env.APP_PORT;
const app = express();

app.use(json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONT_URL, // replace with your frontend domain
    credentials: true,
  }),
);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/election", electionRouter);

app.use((req, res) => {
  res.status(404).json(
    createApiResponse({
      message: "Not Found",
    }),
    true,
  );
});

app.use(handleError);

app.listen(APP_PORT, () => {
  console.log(`Server is listening on port ${APP_PORT}`);
});
