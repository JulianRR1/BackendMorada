import express from "express";
import { getAllEmergency, getByEstadoMunicipio, createEmergency, updateEmergency, deleteEmergency } from "../controllers/emergency.controller.js";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js"; // Ensure to import the verifyToken middleware

router.get("/", getAllEmergency);
router.get("/:state/:municipality", getByEstadoMunicipio);

router.post("/", verifyToken, createEmergency);
router.put("/:id", verifyToken, updateEmergency);
router.delete("/:id", verifyToken, deleteEmergency);

export default router;