import { Router } from "express";
import { prisma } from "../lib/db.js";

const authRouter = Router();

authRouter.get("", (req, res) => {
  res.json({ message: "Get request on /auth" });
});

authRouter.post("", async (req, res) => {
  try {
    const { username, password } = req.query;
    const user = await prisma.user.create({
      data: {
        password,
        username,
        profile: {
          create: {
            phoneNumber: "10000000",
          },
        },
      },
    });
    return res.json({ data: user });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: e });
  }
});

export default authRouter;
