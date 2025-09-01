import mongoose from "mongoose";

const urlRegex = /^https?:\/\/.+/i;

const SectionSchema = new mongoose.Schema({
    subtitle: { type: String, required: true , trim: true },
    information: {type: String, required: true, trim: true },
    imageUrl: {
        type: String, // ej. "image/jpeg", "image/png"
        trim: true,
        required: false,
        match: [urlRegex, "URL de una imagen inválida"]
    },
    imageAlt: {type: String, required: false, trim: true},
    videoUrl: {
        type: String, // ej. "https://www.youtube.com/watch?v=example"
        trim: true,
        required: false,
        match: [urlRegex, "URL de un video inválida"]
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
        match: [urlRegex, "URL de un archivo inválida"]
    }, // URL del archivo
    fileAlt: { type: String, required: false, trim: true }, // Texto alternativo para el archivo
    imageUrl: {
        type: String, // ej. "image/jpeg", "image/png"
        trim: true,
        required: false,
        match: [urlRegex, "URL de una imagen inválida"]
    }, // URL de la imagen
    imageAlt: { type: String, required: false, trim: true }, // Texto
    
}, { timestamps: true });

InformationSchema.index({ title: "text" });

const Information = mongoose.model("Information", InformationSchema);

export default Information;