// pages/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Login from '../components/Login';
import Chat from '../components/Chat';
import GeminiChat from '../components/GeminiChat';
import styles from '../styles/Home.module.css';

function Home() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleLogin = ({ username, room }) => {
    setUsername(username);
    setRoom(room);
    setShowChat(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Chat App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!showChat ? (
        <div className={styles.loginContainer}>
          <h1>Welcome to Chat App</h1>
          <Login onLogin={handleLogin} />
        </div>
      ) : (
        <div className={styles.chatContainer}>
          <Chat username={username} room={room} />
          <GeminiChat />
        </div>
      )}
    </div>
  );
}

export default Home;
