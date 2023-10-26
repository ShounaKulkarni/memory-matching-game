import React, { useState } from 'react';

function ChatInput({ onSendMessage }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (name.trim() !== '' && message.trim() !== '') {
      onSendMessage(`${name}: ${message}`);
      setMessage('');
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default ChatInput;
