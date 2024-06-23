import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['student', 'expert'] },
  specialization: String,  // For experts
  topic: String,           // For students
})

export default mongoose.models.User || mongoose.model('User', UserSchema)