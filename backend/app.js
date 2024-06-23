require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

const Message = require('./models/Message');
const authRoutes = require('./routes/auth'); // Import auth routes

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes); // Use auth routes

console.log('MongoDB URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
});

io.on('connection', (socket) => {
  socket.on('join', ({ username, room }) => {
    socket.join(room);
    Message.find({ room })
      .sort({ createdAt: -1 })
      .limit(10)
      .exec((err, messages) => {
        if (err) return console.error(err);
        socket.emit('previousMessages', messages.reverse());
      });
  });

  socket.on('message', ({ username, room, message }) => {
    const msg = new Message({ username, room, message });
    msg.save();
    io.to(room).emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

module.exports = app;
