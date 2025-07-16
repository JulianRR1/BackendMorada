import express from "express";
import { getAllLines, getByName, createLine, updateLine, deleteLine } from "../controllers/line.controller.js";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js"; // Ensure to import the verifyToken middleware

router.get("/", getAllLines);
router.get("/:name", getByName);

router.post("/", verifyToken, createLine);
router.put("/:id", verifyToken, updateLine);
router.delete("/:id", verifyToken, deleteLine);

export default router;