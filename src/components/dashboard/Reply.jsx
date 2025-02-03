import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import DoctorMessageCard from "./DoctorMessage";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);

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

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-bold">Inbox</h2>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <DoctorMessageCard
            key={appointment.id}
            doctorName={appointment.doctorResponse?.doctorName || "Unknown"}
            message={appointment.doctorResponse?.message || "No response yet"}
            dateTime={appointment.doctorResponse?.dateTime}
          />
        ))
      ) : (
        <p>No confirmed appointments yet.</p>
      )}
    </div>
  );
};

export default PatientDashboard;
