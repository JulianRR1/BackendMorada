import LineLSM from "../models/LineLSM.js";

export const getAllLines = async (req, res) => {
    try {
        const lines = await LineLSM.find().lean();
        res.status(200).json(lines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getByName = async (req, res) => {
    const name = req.params.name;
    try {
        const filter = {};
        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }
        const lines = await LineLSM.find(filter).lean();
        if (lines.length === 0) {
            return res.status(404).json({ message: "No se encontro ninguna linea con ese nombre" }); 
        }
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
        const updatedLine = await LineLSM.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
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
