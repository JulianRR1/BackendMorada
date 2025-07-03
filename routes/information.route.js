import express from "express";
import { getAllInformation, getInformationByTitle, createInformation, updateInformation, deleteInformation } from "../controllers/information.controller.js";
const router = express.Router();

router.get("/", getAllInformation);
router.get("/:title", getInformationByTitle);
router.post("/", createInformation);
router.put("/:id", updateInformation);
router.delete("/:id", deleteInformation);

export default router;