import express from "express";
import { getAllEmergency, getByEstadoMunicipio, getByEstadoMunicipio, createEmergency, updateEmergency, deleteEmergency } from "../controllers/emergency.controller";
const router = express.Router();

router.get("/", getAllEmergency);
router.get("/:state/:municipality", getByEstadoMunicipio);
router.post("/", createEmergency);
router.put("/:id", updateEmergency);
router.delete("/:id", deleteEmergency);

export default router;