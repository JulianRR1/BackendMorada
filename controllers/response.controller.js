import Response from "../models/Response.js";

export const getAllResponses = async (req, res) => {
    try {
        const responses = await Response.find();
        res.status(200).json(responses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 

export const getAllByPartPhase = async (req, res) => {
    const { part, phase } = req.params;
    try {
        const filter = {};
        if (part) filter.part = part;
        if (phase) filter.phase = phase;
        const responses = await Response.find(filter);
        res.status(200).json(responses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createResponse = async (req, res) => {
    try {
        const response = new Response(req.body);
        const savedResponse = await response.save();
        res.status(201).json(savedResponse);
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
        res.status(200).json(updatedResponse);
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

