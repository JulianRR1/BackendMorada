import mongoose from "mongoose";

const InstanceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: {
        tel: String,
        email: String,
        address: String,
    },
    hours: String,
    services : [ mongoose.Schema.Types.Mixed ],
    state: String,
    municipality: String
}, { timestamps: true });

const Instance = mongoose.model("Instance", InstanceSchema);

export default Instance;

