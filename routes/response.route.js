import express from "express";
import { getAllResponses, getResponseById, createResponse, updateResponse, deleteResponse } from "../controllers/response.controller.js";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js"; // Ensure to import the verifyToken middleware

router.get("/", getAllResponses);
router.get("/:id", getResponseById);

router.post("/", verifyToken, createResponse);
router.put("/:id", verifyToken, updateResponse);
router.delete("/:id", verifyToken, deleteResponse);

export default router;