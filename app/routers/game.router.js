import express from "express";
import * as gameController from '../controllers/game.controller.js';
import cw from "../middlewares/controllerWrapper.middleware.js";
import jwtAuthMiddleware from "../middlewares/jwtAuth.middleware.js";

const router = express.Router();

router.get("/game", jwtAuthMiddleware, cw(gameController.getGame));
router.get("/game/:id", jwtAuthMiddleware, cw(gameController.getGame));
router.get("/joingame", jwtAuthMiddleware, cw(gameController.joinGame));
router.post("/game", jwtAuthMiddleware, cw(gameController.createGame));
router.patch("/game/:id", jwtAuthMiddleware, cw(gameController.updateGame));
router.delete("/game/:id", jwtAuthMiddleware, cw(gameController.deleteGame));

export default router;