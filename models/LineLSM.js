import mongoose from "mongoose";

const LineLSMSchema = new mongoose.Schema({
    number: String,
    state: String,
    municipality: String,
}, { timestamps: true });

const LineLSM = mongoose.model('LineLSM', LineLSMSchema);

export default LineLSM;