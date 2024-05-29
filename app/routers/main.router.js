import express from "express";
import authRouter from "./auth.router.js";
import userRouter from "./signup.router.js";
import gameRouter from "./game.router.js";
import sheetRouter from "./sheet.router.js";
import profileRouter from "./profile.router.js";
import isLoggedIn from "../middlewares/isLogin.middleware.js";
import licenseRouter from "./license.router.js";

const router = express.Router();

router.use("/api", (authRouter));
router.use("/api", (userRouter));
router.use("/api", (isLoggedIn, gameRouter));
router.use("/api", (isLoggedIn, sheetRouter));
router.use("/api", (isLoggedIn, profileRouter));
router.use("/api", (isLoggedIn, licenseRouter));

export default router;
