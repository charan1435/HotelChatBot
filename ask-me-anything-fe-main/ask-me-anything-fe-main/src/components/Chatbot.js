import React, { useState } from 'react';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [hotel, setHotel] = useState(''); // assuming user selects a hotel from a dropdown or something
  
  const handleInput = (event) => {
    setInput(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setChat([...chat, { message: input, sender: 'user' }]);
    // Here, you would send the user's question to the bot and get the bot's response
    // For the sake of simplicity, I'm just hardcoding a response
    setChat([...chat, { message: 'Here is the answer to your question.', sender: 'bot' }]);
    setInput('');
  };
  
  const handleHotelChange = (event) => {
    setHotel(event.target.value);
    // Here, you would retrieve the conversation history for the selected hotel
    // and populate the chat array with the history
    // For the sake of simplicity, I'm just clearing the chat array
    setChat([]);
  };
  
  return (
    <div className="chatbot-container">
      <h2>Welcome to the {hotel} chatbot</h2>
      <div className="chatbot-messages">
        {chat.map((message, index) => (
          <div key={index} className={message.sender === 'user' ? 'user-message' : 'bot-message'}>
            {message.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Ask a question" value={input} onChange={handleInput} />
        <button type="submit">Send</button>
      </form>
      <div className="hotel-select">
        <label htmlFor="hotel">Select a hotel:</label>
        <select id="hotel" value={hotel} onChange={handleHotelChange}>
          <option value="">Select a hotel</option>
          <option value="hotel1">Hotel 1</option>
          <option value="hotel2">Hotel 2</option>
          <option value="hotel3">Hotel 3</option>
        </select>
      </div>
    </div>
  );
};

export default Chatbot;
