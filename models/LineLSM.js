import mongoose from "mongoose";

const LineLSMSchema = new mongoose.Schema({
    number: String,
    name: String,
}, { timestamps: true });

const LineLSM = mongoose.model('LineLSM', LineLSMSchema);

export default LineLSM;