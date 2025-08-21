import Information from "../models/Information.js";
import { decorateInformationDoc } from "../utils/media.util.js";

export const getAllInformation = async (req, res) => {
    try {
        const list = await Information.find().lean();
        const decorated = list.map(decorateInformationDoc);
        res.status(200).json(decorated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getInformationById = async (req, res) => {
    const { id } = req.params;
    try {
        const information = await Information.findById(id).lean();
        if (!information) {
            return res.status(404).json({ message: "Information not found" });
        }
        res.status(200).json(decorateInformationDoc(information));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createInformation = async (req, res) => {
    try {
        const info = new Information(req.body);
        const saved = await info.save();
        res.status(201).json(decorateInformationDoc(saved));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateInformation = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await Information.findByIdAndUpdate(id, req.body , { new: true, runValidators: true });
        if (!updated) {
            return res.status(404).json({ message: "Information not found" });
        }
        res.status(200).json(decorateInformationDoc(updated));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteInformation = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Information.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Information not found" });
        }
        res.status(200).json({ message: "Information deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
