import Information from "../models/Information.js";

export const getAllInformation = async (req, res) => {
    try {
        const information = await Information.find();
        res.status(200).json(information);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getInformationById= async (req, res) => {
    const { id } = req.params;
    try {
        const information = await Information.findById(id);
        if (!information) {
            return res.status(404).json({ message: "Information not found" });
        }
        res.status(200).json(information);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createInformation = async (req, res) => {
    try {
        const information = new Information(req.body);
        const savedInformation = await information.save();
        res.status(201).json(savedInformation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateInformation = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedInformation = await Information.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedInformation) {
            return res.status(404).json({ message: "Information not found" });
        }
        res.status(200).json(updatedInformation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteInformation = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedInformation = await Information.findByIdAndDelete(id);
        if (!deletedInformation) {
            return res.status(404).json({ message: "Information not found" });
        }
        res.status(200).json({ message: "Information deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
