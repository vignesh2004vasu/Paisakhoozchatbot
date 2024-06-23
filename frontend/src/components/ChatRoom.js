import React from 'react';

const ChatRoom = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.username}</strong>: {msg.message}
        </div>
      ))}
    </div>
  );
};

export default ChatRoom;
