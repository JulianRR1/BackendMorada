import mongoose from "mongoose";

const InstanceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: {
        tel: String,
        email: String,
        address: String,
    },
    hours: String,
    type: {
        type: String,
        enum: ['atencion a la violencia', 'apoyo a personas con discapacidad']
    },
    services : [ mongoose.Schema.Types.Mixed ],
    state: String,
    municipality: String
}, { timestamps: true });

const Instance = mongoose.model("Instance", InstanceSchema);

export default Instance;

