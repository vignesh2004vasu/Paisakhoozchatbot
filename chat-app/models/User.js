// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['student', 'expert'],
    required: true,
  },
  // Add more fields as needed
});

const User = mongoose.model('User', UserSchema);

export default User;
