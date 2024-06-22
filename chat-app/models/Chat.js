// models/Chat.js
const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  room: String,
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Chat || mongoose.model('Chat', ChatSchema);
