// src/firebase/Messages.jsx
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./Firebase"; // Import your Firebase configuration

/**
 * Fetches conversation messages in real-time.
 * @param {string} conversationId - The ID of the conversation to fetch.
 * @param {function} setMessages - A function to update the messages state in the UI.
 * @returns {function} Unsubscribe function to clean up the listener.
 */
export const fetchConversation = (conversationId, setMessages) => {
  if (!conversationId) {
    console.error("fetchConversation: conversationId is undefined or null.");
    return () => {}; // Return a no-op function to prevent runtime issues
  }

  try {
    const conversationRef = doc(db, "conversations", conversationId);
    const unsubscribe = onSnapshot(
      conversationRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setMessages(snapshot.data()?.messages || []);
        } else {
          console.warn(`Conversation with ID "${conversationId}" does not exist.`);
          setMessages([]); // Fallback to an empty message list
        }
      },
      (error) => {
        console.error("Error fetching conversation:", error);
      }
    );

    return unsubscribe; // Return the unsubscribe function for cleanup
  } catch (error) {
    console.error("Unexpected error in fetchConversation:", error);
    return () => {}; // Return a no-op function to prevent crashes
  }
};

/**
 * Sends a message to a specific conversation.
 * @param {string} conversationId - The ID of the conversation.
 * @param {object} message - The message object containing senderId, content, and timestamp.
 */
export const sendMessage = async (conversationId, message) => {
  if (!conversationId) {
    console.error("sendMessage: conversationId is undefined or null.");
    return; // Do nothing if conversationId is invalid
  }

  if (!message || typeof message !== "object") {
    console.error("sendMessage: Invalid message object provided.");
    return; 
  }

  try {
    const conversationRef = doc(db, "conversations", conversationId);
    await updateDoc(conversationRef, {
      messages: arrayUnion(message), 
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
