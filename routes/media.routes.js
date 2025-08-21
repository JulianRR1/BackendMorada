import express from "express";
import { getDriveMedia } from "../controllers/media.controller.js";
const router = express.Router();


router.get("/drive/:fileId", getDriveMedia);

export default router;