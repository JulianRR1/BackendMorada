import express from "express";
import { getAllInstances, getInstanceById, getInformationByStateMunicipality, createInstance, updateInstance, deleteInstance } from "../controllers/instance.controller.js";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js"; // Ensure to import the verifyToken middleware

router.get("/", getAllInstances);
router.get("/:id", getInstanceById);
router.get("/:state/:municipality", getInformationByStateMunicipality);

router.post("/", verifyToken, createInstance);
router.put("/:id", verifyToken, updateInstance);
router.delete("/:id", verifyToken, deleteInstance);

export default router;
