import express from "express";
import { getAllSurveys, getSurveyByPartPhase, createSurvey, updateSurvey, deleteSurvey } from "../controllers/survet.controller.js";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js"; // Ensure to import the verifyToken middleware

router.get("/", getAllSurveys);
router.get("/:part/:phase", getSurveyByPartPhase);

router.post("/", verifyToken, createSurvey);
router.put("/:id", verifyToken, updateSurvey);
router.delete("/:id", verifyToken, deleteSurvey);

export default router;