// api/messages/get.js
import Message from '../../../models/Message';
import connectDB from '../../../lib/db';

connectDB();

export default async function handler(req, res) {
  const { roomId } = req.query;

  try {
    const messages = await Message.find({ $or: [{ sender: roomId }, { receiver: roomId }] })
      .sort({ timestamp: 'asc' })
      .limit(10);
    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
