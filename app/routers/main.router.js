import express from "express";
import * as signupController from "../controllers/signup.controller.js";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/api/login", authController.login);
router.post("/api/signup", signupController.createUser);

export default router;