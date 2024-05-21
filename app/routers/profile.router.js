import express from "express";
import * as profileController from '../controllers/profile.controller.js';

const router = express.Router();

router.get("/profile", profileController.getProfile);
router.patch("/profile", profileController.updateProfile);

export default router;