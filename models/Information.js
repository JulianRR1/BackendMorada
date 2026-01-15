import mongoose from "mongoose";
import { urlOrInternal } from "../validators/urlOrInternal.js";

const urlRegex = /^https?:\/\/.+/i;
const urlOrInternalRegex = /^(https?:\/\/.+|\/api\/media\/[a-z]+\/[A-Za-z0-9_\-]+)$/i;

const SectionSchema = new mongoose.Schema({
    subtitle: { type: String, required: true , trim: true },
    information: {type: String, required: true, trim: true },
    imageUrl: {
        type: String, // ej. "image/jpeg", "image/png"
        trim: true,
        required: false,
        match: [urlOrInternalRegex, "URL de una imagen inválida"],
        validate: urlOrInternal
    },
    imageAlt: {type: String, required: false, trim: true},
    videoUrl: {
        type: String, // ej. "https://www.youtube.com/watch?v=example"
        trim: true,
        required: false,
        match: [urlOrInternalRegex, "URL de un video inválida"],
        validate: urlOrInternal
    },
    videoAlt: {type: String, required: false, trim: true}
}, { _id: false });

const InformationSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: [SectionSchema], default: [] },
    fileUrl: { 
        type: String, // ej. "https://example.com/file.pdf"
        trim: true,
        required: false,
        match: [urlOrInternalRegex, "URL de un archivo inválida"],
        validate: urlOrInternal
    }, // URL del archivo
    fileAlt: { type: String, required: false, trim: true }, // Texto alternativo para el archivo
    imageUrl: {
        type: String, // ej. "image/jpeg", "image/png"
        trim: true,
        required: false,
        match: [urlOrInternalRegex, "URL de una imagen inválida"],
        validate: urlOrInternal
    }, // URL de la imagen
    imageAlt: { type: String, required: false, trim: true }, // Texto
    
}, { timestamps: true });

InformationSchema.index({ title: "text" });

const Information = mongoose.model("Information", InformationSchema);

export default Information;