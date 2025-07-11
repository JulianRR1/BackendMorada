import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
    part: String,
    response: String,
    level: 
    {
        type: String,
        enum: ['baja', 'media', 'alta']
    },
    type: {
        type: String,
        enum: ['prevencion', 'accion']
    }
}, { timestamps: true });

const Response = mongoose.model("Response", ResponseSchema);

export default Response;
