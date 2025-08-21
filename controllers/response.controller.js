import Response from "../models/Response.js";
import  { decorateResponseDoc } from "../utils/media.util.js";

export const getAllResponses = async (req, res) => {
    try {
        const list = await Response.find().lean();
        const responses = list.map(decorateResponseDoc);
        res.status(200).json(responses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 

export const getResponseById= async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Response.findById(id).lean();
        if (!response) {
            return res.status(404).json({ message: "Response not found" });
        }
        res.status(200).json(decorateResponseDoc(response));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createResponse = async (req, res) => {
    try {
        const response = new Response(req.body);
        const savedResponse = await response.save();
        res.status(201).json(decorateResponseDoc(savedResponse));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}  

export const updateResponse = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedResponse = await Response.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedResponse) {
            return res.status(404).json({ message: "Response not found" });
        }
        res.status(200).json(decorateResponseDoc(updatedResponse));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteResponse = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedResponse = await Response.findByIdAndDelete(id);
        if (!deletedResponse) {
            return res.status(404).json({ message: "Response not found" });
        }
        res.status(200).json({ message: "Response deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

