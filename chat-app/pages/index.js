// pages/index.js
import { useState } from 'react';
import Router from 'next/router';

const Index = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('student'); // Default role

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, role }),
      });

      if (response.ok) {
        const { user } = await response.json();
        console.log('Logged in:', user);

        // Redirect based on role
        if (role === 'student') {
          Router.push({
            pathname: '/student',
            query: { username }, // Pass username as query parameter
          });
        } else if (role === 'expert') {
          Router.push({
            pathname: '/expert',
            query: { username }, // Pass username as query parameter
          });
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="expert">Expert</option>
          </select>
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Index;
