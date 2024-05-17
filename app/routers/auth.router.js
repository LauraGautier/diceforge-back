import express from "express";
import * as authController from "../controllers/auth.controller.js";
import * as forgotPasswordController from "../controllers/forgot-password.controller.js";
import * as resetPasswordController from "../controllers/reset-password.controller.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/forgot-password", forgotPasswordController.requestPasswordReset);
router.post("/reset-password", resetPasswordController.resetPassword);

export default router;
