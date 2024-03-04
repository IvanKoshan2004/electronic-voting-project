import { Router } from "express";

const authRouter = Router();

authRouter.get("", (req, res) => {
    res.json({ message: "Get request on /auth" });
});

export default authRouter;
