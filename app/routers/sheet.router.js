import express from "express";
import * as sheetController from '../controllers/sheet.controller.js';

const router = express.Router();

router.get("/sheet", sheetController.getSheet);
router.post("/sheet", sheetController.createSheet);
router.patch("/sheet/:name", sheetController.updateSheet);
router.delete("/sheet/:name", sheetController.deleteSheet);

export default router;