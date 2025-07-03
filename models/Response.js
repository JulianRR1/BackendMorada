import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
    part: String,
    phase: String,
    question: String,
}, { timestamps: true });

const Response = mongoose.model("Response", ResponseSchema);

export default Response;
