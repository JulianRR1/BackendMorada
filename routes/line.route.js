import express from "express";
import { getAllLines, getAllByStateMunicipality, createLine, updateLine, deleteLine } from "../controllers/line.controller";
const router = express.Router();

router.get("/", getAllLines);
router.get("/:state/:municipality", getAllByStateMunicipality);
router.post("/", createLine);
router.put("/:id", updateLine);
router.delete("/:id", deleteLine);

export default router;