import express from "express";
import authRouter from "./auth.router.js";
import userRouter from "./signup.router.js";
import gameRouter from "./game.router.js";
import sheetRouter from "./sheet.router.js";
import profileRouter from "./profile.router.js";
import isLoggedIn from "../middlewares/isLogin.middleware.js";
import cw from "../middlewares/controllerWrapper.middleware.js";
import jwtAuthMiddleware from "../middlewares/jwtAuth.middleware.js";

const router = express.Router();

router.use("/api", cw(authRouter));
router.use("/api", cw(userRouter));
router.use("/api", jwtAuthMiddleware, cw(isLoggedIn, gameRouter));
router.use("/api", jwtAuthMiddleware, cw(isLoggedIn, sheetRouter));
router.use("/api", jwtAuthMiddleware, cw(isLoggedIn, profileRouter));

export default router;
