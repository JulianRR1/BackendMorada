import LineLSM from "../models/LineLSM.JS";

export const getAllLines = async (req, res) => {
    try {
        const lines = await LineLSM.find();
        res.status(200).json(lines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllByStateMunicipality = async (req, res) => {
    const { state, municipality } = req.params;
    try {
        const filter = {};
        if (state) filter.state = state;
        if (municipality) filter.municipality = municipality;
        const lines = await LineLSM.find(filter);
        res.status(200).json(lines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createLine = async (req, res) => {
    try {
        const line = new LineLSM(req.body);
        const savedLine = await line.save();
        res.status(201).json(savedLine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateLine = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedLine = await LineLSM.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedLine) {
            return res.status(404).json({ message: "Line not found" });
        }
        res.status(200).json(updatedLine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteLine = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedLine = await LineLSM.findByIdAndDelete(id);
        if (!deletedLine) {
            return res.status(404).json({ message: "Line not found" });
        }
        res.status(200).json({ message: "Line deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
