// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/Firebase";  // No need for db here since you're using helper functions
import { fetchConversation, sendMessage } from "../firebase/Messages"; // Helper functions
import PropTypes from "prop-types";  // Add PropTypes for validation

const Chat = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages in real-time
  useEffect(() => {
    const unsubscribe = fetchConversation(conversationId, setMessages);
    return () => unsubscribe();
  }, [conversationId]);

  // Handle sending messages
  const handleSend = async () => {
    if (newMessage.trim()) {
      const message = {
        senderId: auth.currentUser.uid,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
      await sendMessage(conversationId, message);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.senderId === auth.currentUser.uid ? "sent" : "received"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

// Prop validation for conversationId
Chat.propTypes = {
  conversationId: PropTypes.string.isRequired,
};

export default Chat;
