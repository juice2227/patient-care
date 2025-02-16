import React, { useState, useEffect } from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { getAuth } from "firebase/auth";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    service: "",
    location: "",
    date: "",
    time: "",
  });
  const [patient, setPatient] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      if (auth.currentUser) {
        const patientRef = doc(db, "users", auth.currentUser.uid);
        const patientSnap = await getDoc(patientRef);
        
        if (patientSnap.exists()) {
          setPatient({
            id: auth.currentUser.uid,
            name: `${patientSnap.data().firstName} ${patientSnap.data().lastName}`,
          });
        }
      }
    };

    fetchPatientDetails();
  }, [auth.currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patient) {
      alert("Error: Patient details not found.");
      return;
    }
    
    try {
      await addDoc(collection(db, "appointments"), {
        ...formData,
        patientId: patient.id,
        patientName: patient.name, 
        status: "pending",
        requestedDateTime: new Date().toISOString(),
      });
      console.log("New appointment added for", patient.name);
    } catch (error) {
      console.error("Error adding new appointment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shadow-lg p-6 rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Request New Appointment</h2>
      <hr className="border-t-2 border-gray-300 mb-6" />
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-700">Service:</label>
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <button type="submit" className="bg-green-500 text-white px-6 py-2 mt-4 rounded-md hover:bg-green-600">
        Submit
      </button>
    </form>
  );
};

export default AppointmentForm;
