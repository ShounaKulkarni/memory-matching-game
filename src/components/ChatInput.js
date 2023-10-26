import React, { useState } from 'react';
import axios from 'axios';

function ChatInput({ onSendMessage }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (name.trim() !== '' && message.trim() !== '') {
      const newMessage = `${name}: ${message}`;
      onSendMessage(newMessage);

      try {
        await axios.post('/api/messages', { message: newMessage });
      } catch (error) {
        console.error('Error adding message:', error);
      }

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
