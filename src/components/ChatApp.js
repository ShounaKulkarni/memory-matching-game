// ChatApp.js
import React, { useState } from 'react';
import ChatMessages from './ChatMessage';
import ChatInput from './ChatInput';
import "./ChatApp.css"

function ChatApp() {
  const [messages, setMessages] = useState([]);
  
  const addMessage = (message) => {
    setMessages([...messages, message]);
  };
  
  return (
    <div className="chat-app">
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={addMessage} />
    </div>
  );
}

export default ChatApp