import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchChatHistory, sendMessage } from "../Redux/actions/ChatActions";
import { useParams } from "react-router-dom";

import "./Chat.css";

function Chat({ messages, fetchChatHistory, sendMessage }) {
  const { userstaycationid } = useParams();

  const [inputValue, setInputValue] = useState("");
  const [botMessage, setBotMessage] = useState(null);
  const [msg, setMsg] = useState([]);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  async function handleSendClick() {
    const response = await sendMessage(inputValue, userstaycationid);
    const newBotMessage = {
      query: response.message,
      respondent: "Bot",
      created_at: Date.now(),
    };
    setInputValue("");
    setBotMessage(newBotMessage);
    setMsg([msg, { query: inputValue, respondent: "User", created_at: Date.now() }]);
   
  }
  
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    const longestTime = "00:00 PM"; // Change this to the longest timestamp you have
    const padding = longestTime.length - formattedTime.length;
    const paddingStr = padding > 0 ? " ".repeat(padding) : "";
    return `${formattedTime}${paddingStr}`;
  }
  

  const groupedMessages = messages.reduce((acc, curr) => {
    const date = new Date(curr.created_at).toLocaleDateString();
    const existingIndex = acc.findIndex((item) => item.date === date);
    if (existingIndex > -1) {
      acc[existingIndex].messages.push(curr);
    } else {
      acc.push({
        date,
        messages: [curr],
      });
    }
    return acc;
  }, []);
  

  useEffect(() => {
    fetchChatHistory(userstaycationid);
    const interval = setInterval(() => {
      fetchChatHistory(userstaycationid);
    }, 5000); // Poll for new messages every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [fetchChatHistory, userstaycationid]);

  return (
    <div className="chat-interface">
      <div className="message-list">
  {groupedMessages.map((group, index) => (
    <div key={index}>
      <div className="message-date">{group.date}</div>
      {group.messages.map((message) => (
        <div key={message.id}>
          <div
            className={
              "message " +
              (message.respondent === "User" ? "user" : "chatbot")
            }
          >
            <div className="message-bubble">
              {message.query}
              <br />
              <div className="message-timestamp">
                {formatTimestamp(message.created_at)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ))}
</div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message here"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleSendClick}>Send</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  messages: state.chat.messages,
});

export default connect(mapStateToProps, { fetchChatHistory, sendMessage })(
  Chat
);
