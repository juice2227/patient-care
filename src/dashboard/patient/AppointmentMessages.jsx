// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const AppointmentMessages = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]); // Track selected messages

  // Fetch confirmed appointments
  useEffect(() => {
    const fetchConfirmedAppointments = () => {
      const q = query(collection(db, "appointments"), where("status", "==", "confirmed"));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const appointmentData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointmentData);
      });

      return () => unsubscribe();
    };

    fetchConfirmedAppointments();
  }, []);

  // Check All: Select all messages
  const handleCheckAll = () => {
    const allIds = appointments.map((appointment) => appointment.id);
    setSelectedMessages(allIds);
  };

  // Clear All: Deselect all messages
  const handleClearAll = () => {
    setSelectedMessages([]);
  };

  // Delete All: Remove selected messages from Firestore
  const handleDeleteAll = async () => {
    try {
      await Promise.all(
        selectedMessages.map(async (id) => {
          await deleteDoc(doc(db, "appointments", id));
        })
      );
      setSelectedMessages([]);
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
  };

  // Refresh: Refetch messages (useful if Firebase doesn’t auto-update)
  const handleRefresh = () => {
    window.location.reload(); // Simple way to refresh, or trigger re-fetch logic
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-lg font-bold">Inbox</h2>
      <div className="flex">
        
        {/* LEFT: Message List */}
        <div className="w-2/3 bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between mb-4">
            <button onClick={handleDeleteAll} className="bg-red-500 text-white px-3 py-1 rounded">Delete All</button>
            <button onClick={handleCheckAll} className="bg-green-500 text-white px-3 py-1 rounded">Check All</button>
            <button onClick={handleClearAll} className="bg-yellow-500 text-white px-3 py-1 rounded">Clear All</button>
            <button onClick={handleRefresh} className="bg-blue-500 text-white px-3 py-1 rounded">Refresh</button>
          </div>
          
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Select</th>
                <th className="border p-2">From</th>
                <th className="border p-2">Subject</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedMessage(appointment)}
                >
                  {/* Checkbox for selecting messages */}
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedMessages.includes(appointment.id)}
                      onChange={() => {
                        setSelectedMessages((prev) =>
                          prev.includes(appointment.id)
                            ? prev.filter((id) => id !== appointment.id)
                            : [...prev, appointment.id]
                        );
                      }}
                    />
                  </td>
                  <td className="border p-2">{appointment.doctorResponse?.doctorName || "Unknown"}</td>
                  <td className="border p-2">Appointment Confirmation</td>
                  <td className="border p-2">{new Date(appointment.doctorResponse?.dateTime).toLocaleDateString()}</td>
                  <td className="border p-2">{new Date(appointment.doctorResponse?.dateTime).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RIGHT: Message Preview */}
        <div className="w-1/3 bg-white shadow-md rounded-lg p-4 ml-4">
          {selectedMessage ? (
            <div>
              <h3 className="text-lg font-bold">Appointment Confirmation</h3>
              <p><strong>From:</strong> {selectedMessage.doctorResponse?.doctorName}</p>
              <p><strong>To:</strong> {selectedMessage.patientName}</p>
              <p><strong>Time:</strong> {new Date(selectedMessage.doctorResponse?.dateTime).toLocaleTimeString()}</p>
              <p className="mt-2">{selectedMessage.doctorResponse?.message}</p>
              <p className="mt-4 text-sm text-gray-500">
                Regards, <br /> {selectedMessage.doctorResponse?.doctorName}
              </p>
            </div>
          ) : (
            <p>Select a message to preview</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentMessages;
