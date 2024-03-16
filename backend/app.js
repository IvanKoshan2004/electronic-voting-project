import express, { json } from "express";
import authRouter from "./routers/auth.js";
import userRouter from "./routers/user.js";
import electionRouter from "./routers/election.js";
import env from "./lib/env.cjs";
import cookieParser from "cookie-parser";
import { handleError } from "./middlewares/handleError.js";

const APP_PORT = env.APP_PORT;
const app = express();

app.use(json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/election", electionRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.use(handleError);

app.listen(APP_PORT, () => {
  console.log(`Server is listening on port ${APP_PORT}`);
});
