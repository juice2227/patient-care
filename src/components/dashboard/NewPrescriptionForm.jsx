import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const NewPrescriptionForm = () => {
  const [appointments, setAppointments] = useState([]);
    const [responseData, setResponseData] = useState({ dateTime: "", message: "" });
    const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    service: "",
    location: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const appointmentData = {
        ...formData,
        status: "pending",  
        doctorResponse: null,  
        requestedDateTime: new Date(`${formData.date}T${formData.time}`).toISOString(),
      };
      await addDoc(collection(db, "appointments"), appointmentData);
      console.log("New appointment request sent!");
    } catch (error) {
      console.error("Error adding new appointment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border">
      <h2>Appointment history</h2>
      <div>
        <label>Service:</label>
        <input
          type="text"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2">
        Submit
      </button>
    </form>
    
    
  );
};

export default NewPrescriptionForm;
