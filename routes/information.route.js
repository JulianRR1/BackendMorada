import express from "express";
import { getAllInformation, getInformationById, createInformation, updateInformation, deleteInformation } from "../controllers/information.controller.js";
const router = express.Router();

router.get("/", getAllInformation);
router.get("/:id", getInformationById);
router.post("/", createInformation);
router.put("/:id", updateInformation);
router.delete("/:id", deleteInformation);

export default router;