import express from "express";
import * as signupController from "../controllers/signup.controller.js";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signupController.createUSer);
router.post("/login", authController.login);

export default router;