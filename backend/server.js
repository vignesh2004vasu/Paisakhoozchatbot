const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { getMessagesByRoom, saveMessage } = require('./controllers/chatController');

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());

// WebSocket communication
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
  console.log('New client connected:', socket.id);

  socket.on('joinRoom', room => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
    // Example: Fetch and emit last 10 messages for the room
    getMessagesByRoom({ params: { room } }, { json: messages => {
      socket.emit('initMessages', messages);
    } });
  });

  socket.on('chatMessage', async ({ room, username, message }) => {
    try {
      const savedMessage = await saveMessage(room, username, message);
      io.to(room).emit('message', { username: savedMessage.username, message: savedMessage.message });
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', (reason) => {
    console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
  });

  socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
  });
});



