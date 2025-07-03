import express from "express";
import { getAllInstances, getInstanceById, getInformationByStateMunicipality, createInstance, updateInstance, deleteInstance } from "../controllers/instance.controller";
const router = express.Router();

router.get("/", getAllInstances);
router.get("/:id", getInstanceById);
router.get("/:state/:municipality", getInformationByStateMunicipality);
router.post("/", createInstance);
router.put("/:id", updateInstance);
router.delete("/:id", deleteInstance);

export default router;
