// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  const dateObj = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return dateObj.toLocaleDateString();
};

const formatTime = (timestamp) => {
  if (!timestamp) return "N/A";
  const dateObj = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return dateObj.toLocaleTimeString();
};

const AppointmentMessages = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);

  useEffect(() => {
    const fetchConfirmedAppointments = async () => {
      const q = query(collection(db, "appointments"), where("status", "==", "confirmed"));

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        console.log("Snapshot size:", snapshot.size);
        const fetchedAppointments = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const data = docSnap.data();
            console.log("Appointment data:", data);

            const doctorRef = doc(db, "users", data.doctorId);
            const patientRef = doc(db, "users", data.patientId);

            const doctorSnap = await getDoc(doctorRef);
            const patientSnap = await getDoc(patientRef);
            console.log("Doctor Snap:", doctorSnap.exists() ? doctorSnap.data() : "Not Found");
            console.log("Patient Snap:", patientSnap.exists() ? patientSnap.data() : "Not Found");

            return {
              id: docSnap.id,
              ...data,
              doctorName: doctorSnap.exists() ? doctorSnap.data().name : "Unknown Doctor",
              patientName: patientSnap.exists() ? patientSnap.data().name : "Unknown Patient",
            };
          })
        );
        console.log("Fetched Appointments:", fetchedAppointments);
        setAppointments(fetchedAppointments);
      });

      return () => unsubscribe();
    };

    fetchConfirmedAppointments();
  }, []);

  const handleCheckAll = () => {
    const allIds = appointments.map((appointment) => appointment.id);
    setSelectedMessages(allIds);
  };

  const handleClearAll = () => {
    setSelectedMessages([]);
  };

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

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-lg font-bold">Inbox</h2>
      <div className="flex">
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
                <th className="border p-2">From </th>
                <th className="border p-2">To </th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    console.log("Row clicked:", appointment);
                    setSelectedMessage(appointment);
                  }}
                >
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
                  <td className="border p-2">{appointment.doctorName}</td>
                  <td className="border p-2">{appointment.patientName}</td>
                  <td className="border p-2">{formatDate(appointment.doctorResponse?.dateTime)}</td>
                  <td className="border p-2">{formatTime(appointment.doctorResponse?.dateTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-1/3 bg-white shadow-md rounded-lg p-4 ml-4">
          {selectedMessage ? (
            <div>
              <h3 className="text-lg font-bold">Appointment Confirmation</h3>
              <p><strong>From:</strong> {selectedMessage.doctorName}</p>
              <p><strong>To:</strong> {selectedMessage.patientName}</p>
              <p><strong>Time:</strong> {formatTime(selectedMessage.doctorResponse?.dateTime)}</p>
              <p className="mt-2">{selectedMessage.doctorResponse?.message || "No message available"}</p>
              <p className="mt-4 text-sm text-gray-500">
                Regards, <br /> {selectedMessage.doctorName}
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
