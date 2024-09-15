import React, { useState } from 'react';
import './Chatbot.css'; // Create this CSS file for styling

const fruitsData = [
  { id: 1, name: 'Apple', description: 'An apple is a sweet, edible fruit.' },
  { id: 2, name: 'Banana', description: 'Bananas are high in potassium.' },
  { id: 3, name: 'Cherry', description: 'Cherries are small and red.' },
  // Add more fruits as needed
];

const Chatbot = () => {
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [chatInput, setChatInput] = useState('');  // State to store chat input
  const [chatHistory, setChatHistory] = useState([]);  // State to store chat history

  // Handle sending a message in the chat
  const handleSendMessage = () => {
    if (chatInput.trim()) {
      // Add the user message to the chat history
      const userMessage = { sender: 'user', message: chatInput };
      const newChatHistory = [...chatHistory, userMessage];

      // Generate a rule-based bot response
      const botMessage = generateBotResponse(chatInput);
      newChatHistory.push(botMessage);

      setChatHistory(newChatHistory);
      setChatInput('');  // Clear input field after sending
    }
  };

  // Generate a bot response based on simple rule-based logic
  const generateBotResponse = (input) => {
    const lowerInput = input.toLowerCase();

    // Check for keywords in the user input
    if (lowerInput.includes('hello')) {
      return { sender: 'bot', message: 'Hello! How can I assist you today?' };
    } else if (lowerInput.includes('fruit')) {
      return { sender: 'bot', message: 'I can tell you about different fruits! Ask me about Apple, Banana, or Cherry.' };
    } else if (lowerInput.includes('apple')) {
      return { sender: 'bot', message: 'Apples are sweet and great for health!' };
    } else if (lowerInput.includes('banana')) {
      return { sender: 'bot', message: 'Bananas are rich in potassium.' };
    } else if (lowerInput.includes('cherry')) {
      return { sender: 'bot', message: 'Cherries are small, red, and packed with antioxidants.' };
    } else {
      return { sender: 'bot', message: 'Sorry, I didn’t understand that. Can you ask me about a specific fruit?' };
    }
  };

  return (
    <div className="chatbot-container">
      <h2>Chatbot - Fruits List</h2>
      {!selectedFruit ? (
        <div className="fruits-grid">
          {fruitsData.map((fruit) => (
            <div 
              key={fruit.id} 
              className="fruit-card" 
              onClick={() => setSelectedFruit(fruit)}
            >
              <h3>{fruit.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="fruit-detail">
          <h3>{selectedFruit.name}</h3>
          <p>{selectedFruit.description}</p>
          <button onClick={() => setSelectedFruit(null)}>Back to List</button>
        </div>
      )}

      {/* Chatbot Section */}
      <div className="chatbot-chat-section">
        <h3>Chat with Bot</h3>
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div key={index} className={chat.sender === 'user' ? 'chat-user' : 'chat-bot'}>
              <strong>{chat.sender === 'user' ? 'You' : 'Bot'}: </strong>
              <span>{chat.message}</span>
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
