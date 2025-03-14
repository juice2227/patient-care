// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/Firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const DoctorPrescriptions = () => {
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState({
    medicine: "",
    dosage: "",
    instructions: ""
  });
  const [selectedPatient, setSelectedPatient] = useState("");

  useEffect(() => {
    const fetchConfirmedAppointments = async () => {
      try {
        const q = query(collection(db, "appointments"), where("status", "==", "confirmed"));
        const querySnapshot = await getDocs(q);
        const appointments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        console.log("Confirmed Appointments:", appointments); 
        setConfirmedAppointments(appointments);
      } catch (error) {
        console.error("Error fetching confirmed appointments:", error);
      }
    };

    fetchConfirmedAppointments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssignPrescription = async () => {
    if (!selectedPatient) return alert("Please select a patient.");
    
    try {
      const prescription = {
        patientId: selectedPatient.id,
        patientName: selectedPatient.name,
        ...prescriptionData,
        dateTime: new Date().toISOString()
      };
      
      console.log("Saving prescription:", prescription); 
      await addDoc(collection(db, "prescriptions"), prescription);
      
      alert("Prescription assigned successfully!");
      setPrescriptionData({ medicine: "", dosage: "", instructions: "" });
    } catch (error) {
      console.error("Error assigning prescription:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Assign Prescription</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select a Patient:</label>
        <select 
          onChange={(e) => setSelectedPatient(JSON.parse(e.target.value))} 
          value={selectedPatient ? JSON.stringify(selectedPatient) : ""} 
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">-- Select --</option>
          {confirmedAppointments.map((appt) => (
            <option key={appt.id} value={JSON.stringify({ id: appt.patientId, name: appt.patientName })}>
              {appt.patientName} - {appt.doctorResponse?.dateTime ? new Date(appt.doctorResponse.dateTime).toLocaleString() : "No date"}
            </option>
          ))}
        </select>
      </div>

      <h3 className="text-xl font-medium mb-4">Enter Prescription Details:</h3>
      
      <div className="mb-4">
        <input 
          type="text" 
          name="medicine" 
          value={prescriptionData.medicine} 
          onChange={handleInputChange} 
          placeholder="Medicine Name" 
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      
      <div className="mb-4">
        <input 
          type="text" 
          name="dosage" 
          value={prescriptionData.dosage} 
          onChange={handleInputChange} 
          placeholder="Dosage" 
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <textarea 
          name="instructions" 
          value={prescriptionData.instructions} 
          onChange={handleInputChange} 
          placeholder="Instructions" 
          className="p-2 border border-gray-300 rounded-md w-full h-32"
        />
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleAssignPrescription} 
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
        >
          Assign Prescription
        </button>
      </div>
    </div>
  );
};

export default DoctorPrescriptions;
