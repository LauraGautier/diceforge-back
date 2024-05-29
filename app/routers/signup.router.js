import express from "express";
import * as signupController from "../controllers/signup.controller.js";
import cw from "../middlewares/controllerWrapper.middleware.js";

const router = express.Router();

router.post("/signup", cw(signupController.createUser));

export default router;
