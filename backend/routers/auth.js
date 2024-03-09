import { Router } from "express";
import authController from "../controllers/auth-controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isBodyEmpty } from "../middlewares/isBodyEmpty.js";

const authRouter = Router();

authRouter.post("/register", isBodyEmpty, authController.register);

authRouter.post("/login", isBodyEmpty, authController.login);

authRouter.post("/logout", authController.logout);

authRouter.get("/current", isAuthenticated, authController.getCurrent);

export default authRouter;
