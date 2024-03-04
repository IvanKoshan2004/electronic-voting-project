import { Router } from "express";

const userRouter = Router();

userRouter.get("", (req, res) => {
    res.json({ message: "Get user" });
});

userRouter.post("", (req, res) => {
    res.json({ message: "post user" });
});

export default userRouter;
