import mongoose from "mongoose";

const urlRegex = /^https?:\/\/.+/i;

const SurveySchema = new mongoose.Schema({
    part: { type: String, required: true, trim: true },
    phase: { type: String, required: true, trim: true },
    question: { type: String, required: true, trim: true },
    videoUrl: {
        type: String, // ej. "https://www.youtube.com/watch?v=example"
        trim: true,
        required: false,
        match: [urlRegex, "URL de un video inválida"]
    },
    videoAlt: { type: String, required: false, trim: true },
}, { timestamps: true });

SurveySchema.index({ part: 1, phase: 1 });

const Survey = mongoose.model("Survey", SurveySchema);

export default Survey;