import express from "express";
import authRoutes from "./auth.router.js";
import userRoutes from "./signup.router.js";

const router = express.Router();

router.use("/api", authRoutes);
router.use("/api", userRoutes);

export default router;
