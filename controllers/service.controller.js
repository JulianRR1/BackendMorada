import Service from "../models/Service.js";

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllByType = async (req, res) => {
    const { type } = req.params;
    try {
        const filter = {};
        if (type) filter.type = type;
        const services = await Service.find(filter);
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createService = async (req, res) => {
    try {
        const service = new Service(req.body);
        const savedService = await service.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateService = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedService = await Service.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

