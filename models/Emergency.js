import mongoose from 'mongoose';

const EmergencySchema = new mongoose.Schema({
  number: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  municipality: { type: String, required: true, trim: true },
  emergencyType: {
    type: String,
    enum: ['denuncia anónima', 'apoyo policial', 'línea mujeres'],
    required: true,
    trim: true
  }
}, { timestamps: true });

EmergencySchema.index({ state: 1, municipality: 1, emergencyType: 1 });
EmergencySchema.index({ state: 1, emergencyType: 1 });

const Emergency = mongoose.model('Emergency', EmergencySchema);

export default Emergency;
