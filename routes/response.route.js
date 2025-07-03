import express from "express";
import { getAllResponses, getAllByPartPhase, createResponse, updateResponse, deleteResponse } from "../controllers/response.controller";
const router = express.Router();

router.get("/", getAllResponses);
router.get("/:part/:phase", getAllByPartPhase);
router.post("/", createResponse);
router.put("/:id", updateResponse);
router.delete("/:id", deleteResponse);

export default router;