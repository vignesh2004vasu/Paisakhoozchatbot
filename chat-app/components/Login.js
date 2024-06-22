// components/Login.js
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && room) {
      onLogin({ username, room });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Room:</label>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          required
        />
      </div>
      <button type="submit">Join</button>
    </form>
  );
}

export default Login;
