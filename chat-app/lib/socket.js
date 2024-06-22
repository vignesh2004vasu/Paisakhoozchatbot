// lib/socket.js
import { Server } from 'socket.io';
import http from 'http';

const socketio = (app) => {
  const server = http.createServer(app);
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('joinRoom', ({ room, username }) => {
      socket.join(room);
      console.log(`${username} joined room ${room}`);
    });

    socket.on('chatMessage', (message) => {
      console.log('Received message:', message);
      io.to(message.receiver).emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  });

  return server;
};

export default socketio;
