import express from "express";
import { getAllServices, getAllByType, createService, updateService, deleteService } from "../controllers/service.controller";
const router = express.Router();

router.get("/", getAllServices);
router.get("/:type", getAllByType);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;