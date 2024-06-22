// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ChatSchema = new mongoose.Schema({
  room: String,
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.models.Chat || mongoose.model('Chat', ChatSchema);

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = socketIo(server);

  io.on('connection', (socket) => {
    socket.on('joinRoom', async ({ room, username }) => {
      socket.join(room);

      const messages = await Chat.find({ room }).sort({ timestamp: -1 }).limit(10);
      socket.emit('previousMessages', messages.reverse());

      socket.on('message', async (message) => {
        const chatMessage = new Chat({ room, username, message });
        await chatMessage.save();

        io.to(room).emit('message', {
          username,
          message,
          timestamp: chatMessage.timestamp,
        });
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
