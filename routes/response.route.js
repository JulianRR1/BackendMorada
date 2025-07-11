import express from "express";
import { getAllResponses, getResponseById, createResponse, updateResponse, deleteResponse } from "../controllers/response.controller.js";
const router = express.Router();

router.get("/", getAllResponses);
router.get("/:id", getResponseById);
router.post("/", createResponse);
router.put("/:id", updateResponse);
router.delete("/:id", deleteResponse);

export default router;