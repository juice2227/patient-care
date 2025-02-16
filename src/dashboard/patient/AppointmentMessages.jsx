// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/Firebase"; 

const AppointmentMessages = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [doctorName, setDoctorName] = useState("");

  
  useEffect(() => {
    const fetchDoctorName = async () => {
      if (auth.currentUser) {
        console.log("Fetching doctor data for:", auth.currentUser.uid);

        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          console.log("Doctor Data:", userData);
          setDoctorName(`${userData.firstName} ${userData.lastName}`);
        } else {
          console.error("Doctor not found in users collection.");
        }
      } else {
        console.warn("No user logged in.");
      }
    };

    fetchDoctorName();
  }, []);

  
  const fetchConfirmedAppointments = () => {
    const q = query(collection(db, "appointments"), where("status", "==", "confirmed"));

    return onSnapshot(q, async (snapshot) => {
      const appointmentData = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const appointment = { id: docSnap.id, ...docSnap.data() };

          
          if (appointment.patientId) {
            const patientRef = doc(db, "users", appointment.patientId);
            const patientSnap = await getDoc(patientRef);

            if (patientSnap.exists()) {
              appointment.patientName = `${patientSnap.data().firstName} ${patientSnap.data().lastName}`;
            } else {
              appointment.patientName = "Unknown Patient";
            }
          } else {
            appointment.patientName = "Unknown Patient";
          }

          return appointment;
        })
      );

      console.log("Appointments fetched with patient names:", appointmentData);
      setAppointments(appointmentData);
    });
  };

  useEffect(() => {
    const unsubscribe = fetchConfirmedAppointments();
    return () => unsubscribe();
  }, []);

  //for selectin messages
  const handleCheckAll = () => {
    if (selectedMessages.length === appointments.length) {
      setSelectedMessages([]);
    } else {
      const allIds = appointments.map((appointment) => appointment.id);
      setSelectedMessages(allIds);
    }
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
    fetchConfirmedAppointments();
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-lg font-bold">Inbox</h2>
      <div className="flex">
        <div className="w-2/3 bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between mb-4">
            <button onClick={handleDeleteAll} className="bg-red-500 text-white px-3 py-1 rounded">Delete All</button>
            <button onClick={handleCheckAll} className="bg-green-500 text-white px-3 py-1 rounded">
              {selectedMessages.length === appointments.length ? "Uncheck All" : "Check All"}
            </button>
            <button onClick={handleClearAll} className="bg-yellow-500 text-white px-3 py-1 rounded">Clear All</button>
            <button onClick={handleRefresh} className="bg-blue-500 text-white px-3 py-1 rounded">Refresh</button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Select</th>
                <th className="border p-2">From</th>
                <th className="border p-2">To</th>
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
                  <td className="border p-2">
                    {appointment.doctorResponse?.doctorName || doctorName || "Unknown"}
                  </td>
                  <td className="border p-2">{appointment.patientName || "Unknown"}</td>
                  <td className="border p-2">Appointment Confirmation</td>
                  <td className="border p-2">
                    {appointment.doctorResponse?.timestamp
                      ? new Date(appointment.doctorResponse.timestamp.toDate()).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="border p-2">
                    {appointment.doctorResponse?.timestamp
                      ? new Date(appointment.doctorResponse.timestamp.toDate()).toLocaleTimeString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="w-1/3 bg-white shadow-md rounded-lg p-4 ml-4">
          {selectedMessage ? (
            <div>
              <h3 className="text-lg font-bold">Appointment Confirmation</h3>
              <button
                className="text-red-500 text-sm float-right"
                onClick={() => setSelectedMessage(null)}
              >
                Close ✖
              </button>
              <p><strong>From:</strong> {selectedMessage.doctorResponse?.doctorName || doctorName || "Unknown"}</p>
              <p><strong>To:</strong> {selectedMessage.patientName || "Unknown"}</p>
              <p><strong>Date/Time:</strong> 
              
                {selectedMessage.doctorResponse?.timestamp
                  ? new Date(selectedMessage.doctorResponse.timestamp.toDate()).toLocaleString()
                  : "N/A"}
              </p>
              
              <p className="mt-2">{selectedMessage.doctorResponse?.message || "No message provided."}</p>
              <p className="mt-4 text-sm text-gray-500">
                Regards, <br /> {selectedMessage.doctorResponse?.doctorName || doctorName || "Doctor"}
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