// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { listenForMessages } from "../firebase/SendMessage";

const PatientDashboard = ({ appointmentId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!appointmentId) {
      console.error(" Missing appointmentId in PatientDashboard!");
      return;
    }

    console.log("Watching for messages in:", appointmentId);

    const unsubscribe = listenForMessages(appointmentId, (newMessages) => {
      console.log(" Messages received in PatientDashboard:", newMessages);
      setMessages(newMessages);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [appointmentId]);

  return (
    <div>
      <h2>Messages</h2>
      {messages.length === 0 ? <p>No messages yet</p> : (
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>
              <strong>{msg.senderId}:</strong> {msg.message} <br />
              <small>{msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleString() : "No timestamp"}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientDashboard;
