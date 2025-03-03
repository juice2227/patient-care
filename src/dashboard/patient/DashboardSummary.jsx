import { useState, useEffect } from "react";
import { db, auth } from "../../firebase/Firebase"; // Ensure you import Firebase setup
import { doc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";

const DashboardSummary = () => {
  const [patientInfo, setPatientInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        // Fetch patient details from "users" collection
        const patientRef = doc(db, "users", user.uid);
        const patientSnap = await getDoc(patientRef);
        if (patientSnap.exists()) {
          setPatientInfo(patientSnap.data());
        } else {
          setPatientInfo({});
        }

        // Fetch appointments
        const appointmentsQuery = query(
          collection(db, "appointments"),
          where("patientId", "==", user.uid)
        );
        onSnapshot(appointmentsQuery, (snapshot) => {
          setAppointments(snapshot.docs.map((doc) => doc.data()));
        });

        // Fetch messages
        const messagesQuery = query(
          collection(db, "messages"),
          where("patientId", "==", user.uid)
        );
        onSnapshot(messagesQuery, (snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });

        // Fetch prescriptions
        const prescriptionsQuery = query(
          collection(db, "prescriptions"),
          where("patientId", "==", user.uid)
        );
        onSnapshot(prescriptionsQuery, (snapshot) => {
          setPrescriptions(snapshot.docs.map((doc) => doc.data()));
        });

      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
      {/* General Information */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold">General Information</h3>
        {patientInfo ? (
          <>
            <p>Name: {`${patientInfo.firstName || "Not available"} ${patientInfo.lastName || ""}`}</p>
            <p>Gender: {patientInfo.gender || "Not provided"}</p>
            <p>Age: {patientInfo.age ? `${patientInfo.age} years` : "Not provided"}</p>
            <p>Weight: {patientInfo.weight ? `${patientInfo.weight} kg` : "Not provided"}</p>
            <p>Height: {patientInfo.height ? `${patientInfo.height} cm` : "Not provided"}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Appointments */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold">Appointments</h3>
        {appointments.length > 0 ? (
          appointments.map((appt, index) => (
            <p key={index}>{appt.doctor} - {appt.date} at {appt.time}</p>
          ))
        ) : (
          <p>No upcoming appointments</p>
        )}
      </div>

      {/* Messages */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold">Messages</h3>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <p key={index}>{msg.doctor}: "{msg.text}"</p>
          ))
        ) : (
          <p>No new messages</p>
        )}
      </div>

      {/* Prescriptions */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold">Prescriptions</h3>
        {prescriptions.length > 0 ? (
          prescriptions.map((presc, index) => (
            <p key={index}>{presc.medicine} - {presc.dosage}</p>
          ))
        ) : (
          <p>No prescriptions available</p>
        )}
      </div>
    </div>
  );
};

export default DashboardSummary;
