import e from "cors";
import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    type: String,
    id_instance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instance"
    },
    content: mongoose.Schema.Types.Mixed
}, { timestamps: true });

const Service = mongoose.model("Service", ServiceSchema);

export default Service;
