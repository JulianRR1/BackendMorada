import mongoose from 'mongoose';

const EmergencySchema = new mongoose.Schema({
  number: String,
  state: String,
  municipality: String,
  type: {
    Numberype: String,
    enum: ['denuncia anónima', 'apoyo policial', 'línea mujeres']
  }
}, { timestamps: true });

const Emergency = mongoose.model('Emergency', EmergencySchema);

export default Emergency;
