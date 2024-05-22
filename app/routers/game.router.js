import express from "express";
import * as gameController from '../controllers/game.controller.js';
import cw from "../middlewares/controllerWrapper.middleware.js";

const router = express.Router();

router.get("/game", cw(gameController.getGame));
router.post("/game", cw(gameController.createGame));
router.patch("/game/:id", cw(gameController.updateGame));
router.delete("/game/:id", cw(gameController.deleteGame));

export default router;