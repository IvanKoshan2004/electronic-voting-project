import express, { json } from "express";
import authRouter from "./routers/auth.js";
import userRouter from "./routers/user.js";
import { env } from "./lib/env.js";
import cookieParser from "cookie-parser";

const APP_PORT = env.APP_PORT;
const app = express();

app.use(json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  console.log(message);
  res.status(status).json({ message });
});

app.listen(APP_PORT, () => {
  console.log(`Server is listening on port ${APP_PORT}`);
});
