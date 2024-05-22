import express from "express";
import * as sheetController from '../controllers/sheet.controller.js';
import cw from "../middlewares/controllerWrapper.middleware.js";

const router = express.Router();

router.get("/sheet", cw(sheetController.getSheet));
router.post("/sheet", cw(sheetController.createSheet));
router.patch("/sheet/:name", cw(sheetController.updateSheet));
router.delete("/sheet/:name", cw(sheetController.deleteSheet));

export default router;