const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { getMessagesByRoom, saveMessage } = require('./controllers/chatController');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// WebSocket communication
io.on('connection', socket => {
  console.log('New client connected:', socket.id);

  socket.on('joinRoom', room => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
    // Fetch and emit last 10 messages for the room
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

// Routes for user authentication
app.use('/api/auth', require('./routes/auth'));

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
