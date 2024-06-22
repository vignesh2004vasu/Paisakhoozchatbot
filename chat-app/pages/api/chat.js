// pages/api/chat.js
import mongoose from 'mongoose';
import Chat from '../../models/Chat';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { room } = req.query;
    const messages = await Chat.find({ room }).sort({ timestamp: -1 }).limit(10);
    res.status(200).json(messages.reverse());
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;
