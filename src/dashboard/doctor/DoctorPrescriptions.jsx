// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/Firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const DoctorPrescriptions = () => {
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState({ medicine: "", dosage: "", instructions: "" });
  const [selectedPatientId, setSelectedPatientId] = useState("");

  useEffect(() => {
    const fetchConfirmedAppointments = async () => {
      try {
        const q = query(collection(db, "appointments"), where("status", "==", "confirmed"));
        const querySnapshot = await getDocs(q);
        setConfirmedAppointments(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching confirmed appointments:", error);
      }
    };

    fetchConfirmedAppointments();
  }, []);

  const handlePrescriptionChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssignPrescription = async () => {
    if (!selectedPatientId) return alert("Please select a patient.");
    try {
      await addDoc(collection(db, "prescriptions"), {
        patientId: selectedPatientId,
        ...prescriptionData,
        dateTime: new Date().toISOString(),
      });
      alert("Prescription assigned successfully!");
      setPrescriptionData({ medicine: "", dosage: "", instructions: "" });
    } catch (error) {
      console.error("Error assigning prescription:", error);
    }
  };

  return (
    <div>
      <h1>Doctor - Assign Prescriptions</h1>
      <label>Select a Patient:</label>
      <select onChange={(e) => setSelectedPatientId(e.target.value)} value={selectedPatientId}>
        <option value="">-- Select --</option>
        {confirmedAppointments.map((appt) => (
          <option key={appt.id} value={appt.patientId}>
            {appt.patientName} - {appt.doctorResponse?.dateTime ? new Date(appt.doctorResponse.dateTime).toLocaleString() : "No date"}
          </option>
        ))}
      </select>

      <h3>Enter Prescription Details:</h3>
      <input 
        type="text" 
        name="medicine" 
        value={prescriptionData.medicine} 
        onChange={handlePrescriptionChange} 
        placeholder="Medicine Name" 
      />
      <input 
        type="text" 
        name="dosage" 
        value={prescriptionData.dosage} 
        onChange={handlePrescriptionChange} 
        placeholder="Dosage" 
      />
      <textarea 
        name="instructions" 
        value={prescriptionData.instructions} 
        onChange={handlePrescriptionChange} 
        placeholder="Instructions"
      />

      <button onClick={handleAssignPrescription}>Assign Prescription</button>
    </div>
  );
};

export default DoctorPrescriptions;
