const Message = require('../models/Message');

const getMessagesByRoom = async (req, res) => {
  try {
    const room = req.params.room;
    const messages = await Message.find({ room }).sort({ timestamp: -1 }).limit(10);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

const saveMessage = async (room, username, message) => {
  try {
    const newMessage = new Message({ room, username, message });
    return await newMessage.save();
  } catch (err) {
    throw new Error('Error saving message');
  }
};

module.exports = { getMessagesByRoom, saveMessage };
