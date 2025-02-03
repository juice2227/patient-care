// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/Firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

import DoctorPrescriptions from "./DoctorPrescriptions.jsx";

const AppointmentAcceptance = () => {
  const [appointments, setAppointments] = useState([]);
  const [responseData, setResponseData] = useState({ dateTime: "", message: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadAppointments = async () => {
      const q = query(collection(db, "appointments"), where("status", "==", "pending"));
      const querySnapshot = await getDocs(q);
      const appointmentsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(appointmentsList);
    };

    loadAppointments();
  }, []);

  const handleResponseChange = (e) => {
    const { name, value } = e.target;
    setResponseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRespond = async (appointmentId) => {
    try {
      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, {
        status: "confirmed",
        doctorResponse: {
          dateTime: new Date(responseData.dateTime).toISOString(),
          message: responseData.message,
        },
      });
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === appointmentId
            ? { ...item, status: "confirmed", doctorResponse: responseData }
            : item
        )
      );
      setResponseData({ dateTime: "", message: "" }); 
      setEditingId(null);
    } catch (error) {
      console.error("Error responding to appointment:", error);
    }
  };

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <div className="appointments">
        {appointments.map((appointment) => (
          <div key={appointment.id}>
            <h3>Patient Appointment</h3>
            <p>Service: {appointment.service}</p>
            <p>Location: {appointment.location}</p>
            <p>Date: {new Date(appointment.requestedDateTime).toLocaleString()}</p>
            {appointment.status === "pending" && (
              <div>
                <h4>Respond to Appointment</h4>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={responseData.dateTime}
                  onChange={handleResponseChange}
                  required
                />
                <textarea
                  name="message"
                  value={responseData.message}
                  onChange={handleResponseChange}
                  placeholder="Leave a message for the patient"
                ></textarea>
                <button onClick={() => handleRespond(appointment.id)}>Confirm Appointment</button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <DoctorPrescriptions/>
    </div>
  );
};

export default AppointmentAcceptance;
