import Instance from "../models/Instance.js";

export const getAllInstances = async (req, res) => {
    try {
        const instances = await Instance.find();
        res.status(200).json(instances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getInstanceById = async (req, res) => {
    const { id } = req.params;
    try {
        const instance = await Instance.findById(id);
        if (!instance) {
            return res.status(404).json({ message: "Instance not found" });
        }
        res.status(200).json(instance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   

export const getInformationByStateMunicipality = async (req, res) => {
    const { state, municipality } = req.params;
    try {
        const filter = {};
        if (state) filter.state = state;
        if (municipality) filter.municipality = municipality;
        const instances = await Instance.find(filter);
        res.status(200).json(instances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createInstance = async (req, res) => {
    try {
        const instance = new Instance(req.body);
        const savedInstance = await instance.save();
        res.status(201).json(savedInstance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateInstance = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedInstance = await Instance.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedInstance) {
            return res.status(404).json({ message: "Instance not found" });
        }
        res.status(200).json(updatedInstance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteInstance = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedInstance = await Instance.findByIdAndDelete(id);
        if (!deletedInstance) {
            return res.status(404).json({ message: "Instance not found" });
        }
        res.status(200).json({ message: "Instance deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}