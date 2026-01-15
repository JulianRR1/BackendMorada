import mongoose from "mongoose";
import { urlOrInternal } from "../validators/urlOrInternal.js";

const urlRegex = /^https?:\/\/.+/i;
const urlOrInternalRegex = /^(https?:\/\/.+|\/api\/media\/[a-z]+\/[A-Za-z0-9_\-]+)$/i;

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
        match: [urlOrInternalRegex, "URL de un video inválida"],
        validate: urlOrInternal
    },
    videoAlt: { type: String, required: false, trim: true },
}, { timestamps: true });

ResponseSchema.index({ phase: 1, level: 1, type: 1 });

const Response = mongoose.model("Response", ResponseSchema);

export default Response;
