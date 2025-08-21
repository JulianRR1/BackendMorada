import mongoose from "mongoose";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s()+\-]{5,20}$/;

const InstanceSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    contact: {
        tel: { type: String, required: true, trim: true, match: [phoneRegex, "Número de teléfono inválido"] },
        email: { type: String, required: true, trim: true, match: [emailRegex, "Email inválido"] },
        address: { type: String, required: true, trim: true },
    },
    hours: { type: String, required: true, trim: true },
    type: {
        type: String,
        enum: ['atencion a la violencia', 'apoyo a personas con discapacidad'],
        required: true,
        trim: true
    },
    services : [ mongoose.Schema.Types.Mixed ],
    state: { type: String, required: true, trim: true },
    municipality: { type: String, required: true, trim: true },
}, { timestamps: true });

InstanceSchema.index({ state: 1, municipality: 1, type: 1 });
InstanceSchema.index({ state: 1, municipality: 1 }, { collation: { locale: 'en', strength: 2 } });

const Instance = mongoose.model("Instance", InstanceSchema);

export default Instance;

