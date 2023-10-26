import React from 'react';

function ChatMessages({ messages }) {
  return (
    <div className="chat-messages">
      {messages.map((message, index) => (
        <div key={index} className="message-box">
          {message}
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
