import express from "express";
import * as profileController from '../controllers/profile.controller.js';
import cw from "../middlewares/controllerWrapper.middleware.js";
import jwtAuthMiddleware from "../middlewares/jwtAuth.middleware.js";

const router = express.Router();

router.get("/profile", jwtAuthMiddleware, cw(profileController.getProfile));
router.patch("/profile", jwtAuthMiddleware, cw(profileController.updateProfile));

export default router;