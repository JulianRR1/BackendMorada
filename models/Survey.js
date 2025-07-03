import mongoose from "mongoose";

const SurveySchema = new mongoose.Schema({
    part: String,
    phase: String,
    question: String,
}, { timestamps: true });

const Survey = mongoose.model("Survey", SurveySchema);

export default Survey;