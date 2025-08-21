import Survey from "../models/Survey.js";
import { decorateSurveyDoc } from "../utils/media.util.js";

export const getAllSurveys = async (req, res) => {
    try {
        const list = await Survey.find().lean();
        const surveys = list.map(decorateSurveyDoc);
        res.status(200).json(surveys);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSurveyById = async (req, res) => {
    const { id } = req.params;
    try {
        const survey = await Survey.findById(id).lean();
        if (!survey) {
            return res.status(404).json({ message: "Survey not found" });
        }
        res.status(200).json(decorateSurveyDoc(survey));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSurveyByPartPhase = async (req, res) => {
    const { part, phase } = req.params;
    try {
        const filter = {};
        if (part) filter.part = part;
        if (phase) filter.phase = phase;
        const surveys = await Survey.find(filter);
        res.status(200).json(decorateSurveyDoc(surveys));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createSurvey = async (req, res) => {
    try {
        const survey = new Survey(req.body);
        const savedSurvey = await survey.save();
        res.status(201).json(decorateSurveyDoc(savedSurvey));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateSurvey = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSurvey = await Survey.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSurvey) {
            return res.status(404).json({ message: "Survey not found" });
        }
        res.status(200).json(decorateSurveyDoc(updatedSurvey));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteSurvey = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSurvey = await Survey.findByIdAndDelete(id);
        if (!deletedSurvey) {
            return res.status(404).json({ message: "Survey not found" });
        }
        res.status(200).json({ message: "Survey deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}