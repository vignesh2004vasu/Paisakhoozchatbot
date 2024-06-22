// api/messages/index.js
import Message from '../../../models/Message';
import connectDB from '../../../lib/db';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { sender, receiver, content } = req.body;

    try {
      const message = await Message.create({ sender, receiver, content });
      res.status(201).json(message);
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
