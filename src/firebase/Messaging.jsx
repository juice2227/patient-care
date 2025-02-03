
import { doc, setDoc, arrayUnion, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "./Firebase";


export const sendMessage = async (conversationId, senderId, message) => {
  if (!conversationId || typeof conversationId !== "string") {
    console.error("Invalid conversationId:", conversationId);
    return;
  }

  try {
    const conversationRef = doc(db, "conversations", conversationId);

    
    await setDoc(
      conversationRef,
      {
        messages: arrayUnion({
          senderId,
          message,
          timestamp: new Date().toISOString(),
        }),
      },
      { merge: true }
    );

    console.log("Patient's message sent successfully");

  
    const appointmentRef = doc(db, "appointments", conversationId); 
    const appointmentSnap = await getDoc(appointmentRef);

    if (appointmentSnap.exists()) {
      const appointmentData = appointmentSnap.data();

            if (appointmentData.status === "pending") {
        await setDoc(
          conversationRef,
          {
            messages: arrayUnion({
              senderId: "doctor",
              message: `Your appointment on ${appointmentData.appointmentDate} has been confirmed.`,
              timestamp: new Date().toISOString(),
            }),
          },
          { merge: true }
        );

        console.log("Doctor's confirmation message sent successfully");
      }
    } else {
      console.log("No appointment found for this conversation.");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};


export const setupPatientDashboard = (appointmentId, setMessages) => {
  if (!appointmentId) {
    console.error("Invalid appointmentId:", appointmentId);
    return;
  }

  const conversationRef = doc(db, "conversations", appointmentId);

  
  return onSnapshot(conversationRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      setMessages(data.messages || []);
    } else {
      console.log("No such conversation exists");
    }
  });
};
