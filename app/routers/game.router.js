import express from "express";
import * as gameController from '../controllers/game.controller.js';

const router = express.Router();

router.get("/game", gameController.getGame);
router.post("/game", gameController.createGame);
router.patch("/game/:id", gameController.updateGame);
router.delete("/game/:id", gameController.deleteGame);

export default router;