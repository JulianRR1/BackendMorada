import mongoose from "mongoose";

const urlRegex = /^https?:\/\/.+/i;

const ResponseSchema = new mongoose.Schema({
    phase: { type: String, required: true, trim: true },
    response: { type: String, required: true, trim: true },
    level: 
    {
        type: String,
        enum: ['baja', 'media', 'alta'],
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['prevencion', 'accion'],
        required: true,
        trim: true
    },
    videoUrl: {
        type: String, // ej. "https://www.youtube.com/watch?v=example"
        trim: true,
        required: false,
        match: [urlRegex, "URL de un video inválida"]
    },
    videoAlt: { type: String, required: false, trim: true },
}, { timestamps: true });

ResponseSchema.index({ phase: 1, level: 1, type: 1 });

const Response = mongoose.model("Response", ResponseSchema);

export default Response;
