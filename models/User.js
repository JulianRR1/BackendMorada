import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true, select: false },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
    required: true,
    trim: true,
    alias: 'rol'
  }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;
