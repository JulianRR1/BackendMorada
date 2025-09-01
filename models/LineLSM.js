import mongoose from "mongoose";

const LineLSMSchema = new mongoose.Schema({
    number: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
}, { timestamps: true });


const LineLSM = mongoose.model('LineLSM', LineLSMSchema);

export default LineLSM;