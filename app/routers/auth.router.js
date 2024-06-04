import express from "express";
import * as authController from "../controllers/auth.controller.js";
import * as forgotPasswordController from "../controllers/forgot-password.controller.js";
import * as resetPasswordController from "../controllers/reset-password.controller.js";
import cw from "../middlewares/controllerWrapper.middleware.js";
import * as refreshTokenController from "../controllers/refresh-token.controller.js";

const router = express.Router();

router.post("/login", cw(authController.login));
router.post('/refresh-token', cw(refreshTokenController.refreshAccessToken));
router.post("/forgot-password", cw(forgotPasswordController.requestPasswordReset));
router.post("/reset-password", cw(resetPasswordController.resetPassword));

export default router;
