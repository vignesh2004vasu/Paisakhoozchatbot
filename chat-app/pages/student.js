// pages/student.js
import { useState, useEffect } from 'react';
import Router from 'next/router';
import ChatRoom from '../components/ChatRoom';
import io from 'socket.io-client';

const socket = io();

const Student = () => {
  const [username, setUsername] = useState('');
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    // Fetch available experts
    fetchExperts();

    // Listen for incoming messages
    socket.on('message', (message) => {
      console.log('Received message:', message);
      // Handle incoming message display or update
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const fetchExperts = async () => {
    try {
      const response = await fetch('/api/experts');
      if (response.ok) {
        const data = await response.json();
        setExperts(data);
      } else {
        console.error('Failed to fetch experts');
      }
    } catch (error) {
      console.error('Error fetching experts:', error);
    }
  };

  const handleExpertSelect = (expertUsername) => {
    Router.push(`/chat?username=${encodeURIComponent(username)}&expert=${encodeURIComponent(expertUsername)}`);
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <h2>Welcome, {username}</h2>
      <h3>Available Experts:</h3>
      <ul>
        {experts.map((expert) => (
          <li key={expert.username}>
            {expert.username}
            <button onClick={() => handleExpertSelect(expert.username)}>Chat</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Student;
