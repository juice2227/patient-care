import React, { useEffect, useState } from "react";
import { db } from "../../firebase/Firebase";
import { collection, query, where, getDocs, updateDoc, doc, onSnapshot, Timestamp, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const AppointmentAcceptance = () => {
  const [appointments, setAppointments] = useState([]);
  const [responseData, setResponseData] = useState({ dateTime: "", message: "" });
  const [doctorName, setDoctorName] = useState(""); // 🔹 Store the doctor's name
  const auth = getAuth();

  useEffect(() => {
    // 🔹 Fetch logged-in doctor's name
    const fetchDoctorName = async () => {
      if (auth.currentUser) {
        const doctorRef = doc(db, "doctors", auth.currentUser.uid);
        const doctorSnap = await getDoc(doctorRef);

        if (doctorSnap.exists()) {
          setDoctorName(doctorSnap.data().name);
        } else {
          console.error("Doctor not found in database.");
        }
      }
    };

    fetchDoctorName();

    // 🔹 Fetch pending appointments
    const q = query(collection(db, "appointments"), where("status", "==", "pending"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointmentsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppointments(appointmentsList);
    });

    return () => unsubscribe();
  }, [auth.currentUser]); // Run effect when the authenticated user changes

  const handleResponseChange = (e) => {
    const { name, value } = e.target;
    setResponseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRespond = async (appointmentId) => {
    try {
      if (!responseData.dateTime || !responseData.message) {
        alert("Please fill in all fields before confirming.");
        return;
      }

      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, {
        status: "confirmed",
        doctorResponse: {
          message: responseData.message,
          timestamp: Timestamp.fromDate(new Date(responseData.dateTime)), 
          doctorName: doctorName, // 🔹 Use fetched doctor name
        },
      });

      console.log(`Appointment ${appointmentId} confirmed by ${doctorName}`);

      setResponseData({ dateTime: "", message: "" });
    } catch (error) {
      console.error("Error responding to appointment:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Doctor Dashboard</h1>
      <div className="space-y-6">
        {appointments.length === 0 ? (
          <p className="text-center text-gray-500">No pending appointments.</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className="p-4 border rounded-lg shadow-md bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-700">Patient Appointment</h3>
              <p className="text-gray-600"><strong>Service:</strong> {appointment.service}</p>
              <p className="text-gray-600"><strong>Location:</strong> {appointment.location}</p>
              <p className="text-gray-600"><strong>Requested Date:</strong> {appointment.requestedDateTime ? new Date(appointment.requestedDateTime).toLocaleString() : "N/A"}</p>

              {appointment.status === "pending" && (
                <div className="mt-4">
                  <h4 className="text-md font-medium text-gray-700">Respond to Appointment</h4>
                  <input
                    type="datetime-local"
                    name="dateTime"
                    value={responseData.dateTime}
                    onChange={handleResponseChange}
                    required
                    className="mt-2 w-full p-2 border rounded-lg focus:ring focus:ring-yellow-400"
                  />
                  <textarea
                    name="message"
                    value={responseData.message}
                    onChange={handleResponseChange}
                    placeholder="Leave a message for the patient"
                    className="mt-2 w-full p-2 border rounded-lg focus:ring focus:ring-yellow-400"
                  ></textarea>
                  <button
                    onClick={() => handleRespond(appointment.id)}
                    className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg w-full"
                  >
                    Confirm Appointment
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentAcceptance;
