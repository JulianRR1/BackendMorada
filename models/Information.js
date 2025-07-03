import mongoose from "mongoose";

const InformationSchema = new mongoose.Schema({
    tittle: String,
    description: mongoose.Schema.Types.Mixed
}, { timestamps: true });

const Information = mongoose.model("Information", InformationSchema);

export default Information;