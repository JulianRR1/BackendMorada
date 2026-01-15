import mongoose from "mongoose";
import { urlOrInternal } from "../validators/urlOrInternal.js";

const urlRegex = /^https?:\/\/.+/i;
const urlOrInternalRegex = /^(https?:\/\/.+|\/api\/media\/[a-z]+\/[A-Za-z0-9_\-]+)$/i;

const SurveySchema = new mongoose.Schema({
    part: { type: String, required: true, trim: true },
    phase: { type: String, required: true, trim: true },
    question: { type: String, required: true, trim: true },
    videoUrl: {
        type: String, // ej. "https://www.youtube.com/watch?v=example"
        trim: true,
        required: false,
        match: [urlOrInternalRegex, "URL de un video inválida"],
        validate: urlOrInternal
    },
    videoAlt: { type: String, required: false, trim: true },
}, { timestamps: true });

SurveySchema.index({ part: 1, phase: 1 });

const Survey = mongoose.model("Survey", SurveySchema);

export default Survey;