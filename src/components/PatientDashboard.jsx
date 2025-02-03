// src/components/PatientDashboard.jsx
import React, { useState, useEffect } from 'react';
import { setupPatientDashboard } from '../firebase/Messaging';  // Correct import of named export

const PatientDashboard = ({ appointmentId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!appointmentId) {
      console.error("Missing appointmentId for Patient Dashboard");
      return;
    }

    const unsubscribe = setupPatientDashboard(appointmentId, setMessages); // Initialize message listener
    return () => {
      if (unsubscribe) unsubscribe(); // Cleanup listener when component unmounts
    };
  }, [appointmentId]);

  return (
    <div>
      <h2>Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.senderId}:</strong> {msg.message} <br />
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientDashboard;
