import express from "express";
import * as profileController from '../controllers/profile.controller.js';
import cw from "../middlewares/controllerWrapper.middleware.js";

const router = express.Router();

router.get("/profile", cw(profileController.getProfile));
router.patch("/profile", cw(profileController.updateProfile));

export default router;