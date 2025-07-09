import React from "react";

function ChatConversation({ conversation }) {
  return (
    <div className="chat-conversation">
      {conversation.map((message, index) => (
        <div key={index} className={`message ${message.type}`}>
          <span className="message-time">{message.time}</span>
          <span className="message-text">{message.text}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatConversation;
