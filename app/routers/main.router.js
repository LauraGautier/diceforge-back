import express from "express";
import * as signupController from "../controllers/signup.controller.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/signup",  signupController.createUser);

export default router;