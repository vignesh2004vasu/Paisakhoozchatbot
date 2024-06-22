// components/ChatRoom.js
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

const ChatRoom = ({ username, expert, student }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (username && (expert || student)) {
      // Join chat room based on role (student or expert)
      const room = expert ? `${username}_${expert}` : `${student}_${username}`;
      socket.emit('joinRoom', { room, username });
  
      // Fetch chat history for the room
      fetchChatHistory(room);
  
      // Listen for incoming messages
      socket.on('message', (message) => {
        console.log('Received message:', message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
  
      return () => {
        socket.emit('leaveRoom', room);
        socket.off('message');
      };
    }
  }, [username, expert, student]);

  const fetchChatHistory = async (room) => {
    try {
      const response = await fetch(`/api/messages/${room}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      } else {
        console.error('Failed to fetch chat history');
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      const message = {
        sender: username,
        receiver: expert || student,
        content: messageInput,
      };
      socket.emit('chatMessage', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessageInput('');
    }
  };

  return (
    <div>
      <div ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
