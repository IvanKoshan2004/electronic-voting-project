import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { default as authController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerSchema } from "../validation/registerSchema.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), authController.register);

authRouter.post("/login", validateBody(registerSchema), authController.login);

authRouter.post("/logout", authController.logout);

authRouter.get("/current", isAuthenticated, authController.getCurrent);

export default authRouter;
