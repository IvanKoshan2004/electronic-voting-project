import express from "express";
import authRouter from "./routers/auth.js";
import userRouter from "./routers/user.js";
import { env } from "./lib/env.js";

const APP_PORT = env.APP_PORT;
const app = express();

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.listen(APP_PORT, () => {
  console.log(`Server is listening on port ${APP_PORT}`);
});
