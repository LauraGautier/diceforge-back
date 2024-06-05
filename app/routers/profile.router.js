import express from "express";
import * as profileController from '../controllers/profile.controller.js';
import cw from "../middlewares/controllerWrapper.middleware.js";
import jwtAuthMiddleware from "../middlewares/jwtAuth.middleware.js";
import * as gameController from '../controllers/game.controller.js';

const router = express.Router();

router.get("/profile/:id", jwtAuthMiddleware, cw(gameController.findGamesByUserId));
router.patch("/profile", jwtAuthMiddleware, cw(profileController.updateProfile));

export default router;