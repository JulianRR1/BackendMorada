import express from "express";
import { getAllInformation, getInformationById, createInformation, updateInformation, deleteInformation } from "../controllers/information.controller.js";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js"; // Ensure to import the verifyToken middleware

router.get("/", getAllInformation);
router.get("/:id", getInformationById);

router.post("/", verifyToken, createInformation);
router.put("/:id", verifyToken, updateInformation);
router.delete("/:id", verifyToken, deleteInformation);

export default router;