import express from "express";
import { getAllLines, getByName, createLine, updateLine, deleteLine } from "../controllers/line.controller.js";
const router = express.Router();

router.get("/", getAllLines);
router.get("/:name", getByName);
router.post("/", createLine);
router.put("/:id", updateLine);
router.delete("/:id", deleteLine);

export default router;