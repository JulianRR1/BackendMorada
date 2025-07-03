import express from "express";
import { getAllSurveys, getSurveyByPartPhase, createSurvey, updateSurvey, deleteSurvey } from "../controllers/survet.controller";
const router = express.Router();

router.get("/", getAllSurveys);
router.get("/:part/:phase", getSurveyByPartPhase);
router.post("/", createSurvey);
router.put("/:id", updateSurvey);
router.delete("/:id", deleteSurvey);

export default router;