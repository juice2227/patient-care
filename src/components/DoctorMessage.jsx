// src/components/DoctorMessage.jsx
import React, { useState } from 'react';
import { sendMessage } from '../firebase/Messaging';  // Correct import of named export

const DoctorMessage = ({ appointmentId, doctorId }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (!message.trim()) return;  // Avoid sending empty messages
    await sendMessage(appointmentId, doctorId, message);  // Send the message using Firebase function
    setMessage('');  // Clear the message input after sending
  };

  return (
    <div>
      <h2>Send Confirmation</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default DoctorMessage;
