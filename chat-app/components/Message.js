import React from 'react';

const Message = ({ message, currentUser }) => {
  const { sender, text, timestamp } = message;
  const isSentByCurrentUser = sender === currentUser;

  return (
    <div>
      <p>{sender === currentUser ? 'You' : sender}</p>
      <p>{text}</p>
      <p>{new Date(timestamp).toLocaleTimeString()}</p>
    </div>
  );
};

export default Message;
