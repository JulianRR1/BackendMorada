import Emergency from "../models/Emergency.js";

export const getAllEmergency = async (req, res) => {
    try {
        const emergencies = await Emergency.find().lean();
        res.status(200).json(emergencies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getByEstadoMunicipio = async (req, res) => {
    const { state, municipality } = req.params;
    try {
        const filter = {};
        if (state) filter.state = state;
        if (municipality) filter.municipality = municipality;
        const emergencies = await Emergency.find(filter).lean();
        res.status(200).json(emergencies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createEmergency = async (req, res) => {
    try {
        const news = new Emergency(req.body);
        const savedEmergency = await news.save();
        res.status(201).json(savedEmergency);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const  updateEmergency = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedEmergency = await Emergency.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedEmergency) {
            return res.status(404).json({ message: "Emergency not found" });
        }
        res.status(200).json(updatedEmergency);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteEmergency = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEmergency = await Emergency.findByIdAndDelete(id);
        if (!deletedEmergency) {
            return res.status(404).json({ message: "Emergency not found" });
        }
        res.status(200).json({ message: "Emergency deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
