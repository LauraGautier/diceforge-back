import express from "express";
import * as sheetController from '../controllers/sheet.controller.js';
import cw from "../middlewares/controllerWrapper.middleware.js";
import jwtAuthMiddleware from "../middlewares/jwtAuth.middleware.js";

const router = express.Router();

router.get("/sheet", jwtAuthMiddleware, cw(sheetController.getSheet));
router.get("/binder", jwtAuthMiddleware, cw(sheetController.getAllSheets));
router.post("/sheet", jwtAuthMiddleware, cw(sheetController.createSheet));
router.patch("/sheet/:name", jwtAuthMiddleware, cw(sheetController.updateSheet));
router.delete("/sheet/:name", jwtAuthMiddleware, cw(sheetController.deleteSheet));

export default router;