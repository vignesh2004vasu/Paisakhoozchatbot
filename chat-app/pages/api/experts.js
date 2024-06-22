// api/experts.js
import User from '../../models/User';
import connectDB from '../../lib/db';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const experts = await User.find({ role: 'expert' }).select('username');
      res.status(200).json(experts);
    } catch (error) {
      console.error('Error fetching experts:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
