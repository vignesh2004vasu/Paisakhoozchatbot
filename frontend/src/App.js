import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';
const socket = io(ENDPOINT, {
  transports: ['websocket', 'polling'], // Ensure proper transport methods
  withCredentials: true,
});

const App = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('initMessages', (messages) => {
      setMessages(messages);
    });

    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleJoinRoom = () => {
    if (username && room) {
      socket.emit('joinRoom', room);
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      socket.emit('chatMessage', { room, username, message: messageInput });
      setMessageInput('');
    }
  };

  return (
    <div className="App">
      <h1>Chat Application</h1>
      <div>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter room name"
          value={room}
          onChange={e => setRoom(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
      <div className="chat-room">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={e => setMessageInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;