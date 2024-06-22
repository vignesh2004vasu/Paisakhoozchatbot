// pages/expert.js
import { useState, useEffect } from 'react';
import Router from 'next/router';
import ChatRoom from '../components/ChatRoom';
import io from 'socket.io-client';

const socket = io();

const Expert = () => {
  const [username, setUsername] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students requesting expert's help
    fetchStudents();

    // Listen for incoming messages
    socket.on('message', (message) => {
      console.log('Received message:', message);
      // Handle incoming message display or update
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const fetchStudents = async () => {
    try {
      // Simulate fetching students requesting help from the expert
      const studentsData = [
        { username: 'student1' },
        { username: 'student2' },
        // Add more as needed
      ];
      setStudents(studentsData);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleStudentSelect = (studentUsername) => {
    Router.push(`/chat?username=${encodeURIComponent(username)}&student=${encodeURIComponent(studentUsername)}`);
  };

  return (
    <div>
      <h1>Expert Dashboard</h1>
      <h2>Welcome, {username}</h2>
      <h3>Students Requesting Help:</h3>
      <ul>
        {students.map((student) => (
          <li key={student.username}>
            {student.username}
            <button onClick={() => handleStudentSelect(student.username)}>Chat</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expert;
