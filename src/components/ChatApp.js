import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatMessages from './ChatMessage';
import ChatInput from './ChatInput';
import './ChatApp.css';

function ChatApp() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get('https://match-making-game-766cb3f24122.herokuapp.com/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }

    fetchMessages();
  }, []);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  const deleteMessages = async () => {
    try {
      await axios.delete('https://match-making-game-766cb3f24122.herokuapp.com/api/messages'); 
      setMessages([]);
      console.log('All messages deleted');
    } catch (error) {
      console.error('Error deleting messages:', error);
    }
  };

  const postMessage = async (newMessage) => {
    try {
      const formData = new URLSearchParams();
      formData.append('message', newMessage);
  
      await axios.post('https://match-making-game-766cb3f24122.herokuapp.com/api/messages', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      console.log('Message posted successfully');
      addMessage(newMessage);
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  return (
    <div className="chat-app">
      <button onClick={deleteMessages}>Delete Messages</button>
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={postMessage} />
    </div>
  );
}

export default ChatApp;
