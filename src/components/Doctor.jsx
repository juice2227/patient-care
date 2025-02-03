// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { sendMessage } from "../firebase/Messaging"; // Fix import

const DoctorMessage = ({ appointmentId, doctorId }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (!message.trim()) {
      console.error("Cannot send empty message.");
      return;
    }

    if (!appointmentId || !doctorId) {
      console.error("Missing appointmentId or doctorId!");
      return;
    }

    console.log("Sending message to:", appointmentId);
    await sendMessage(appointmentId, doctorId, message);
    setMessage(""); // Clear input
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
