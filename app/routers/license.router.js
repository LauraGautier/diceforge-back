import express from "express";
import * as licenseController from '../controllers/license.controller.js';
import cw from "../middlewares/controllerWrapper.middleware.js";

const router = express.Router();

router.get("/license", cw(licenseController.getAllLicenses));

export default router;