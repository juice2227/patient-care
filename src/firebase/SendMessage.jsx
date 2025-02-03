// src/firebase/Messaging.js
import { collection, addDoc, serverTimestamp ,onSnapshot} from "firebase/firestore";
import { db } from "./Firebase";

// Send a message and store it in a subcollection
export const sendMessage = async (conversationId, senderId, message) => {
  if (!conversationId) {
    console.error("Missing conversationId. Cannot send message.");
    return;
    
  }

  if (!senderId || !message) {
    console.error("Invalid senderId or message content.");
    return;
  }

  try {
    const messagesRef = collection(db, `conversations/${conversationId}/messages`);

    await addDoc(messagesRef, {
      senderId,
      message,
      timestamp: serverTimestamp(), // Firestore handles the timestamp
    });

    console.log("Message sent successfully:", message);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

console.log("📡 Listening for messages in conversation:", conversationId);


export const listenForMessages = (conversationId, callback) => {
  if (!conversationId) {
    console.error("Missing conversationId. Cannot listen for messages.");
    return () => {}; // Return an empty cleanup function
  }

  const messagesRef = collection(db, `conversations/${conversationId}/messages`);

  return onSnapshot(messagesRef, (querySnapshot) => {
    if (querySnapshot.empty) {
      console.warn(`No messages found for conversationId: ${conversationId}`);
      callback([]);
    } else {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    }
  }, (error) => {
    console.error("Error fetching messages:", error);
  });
};
