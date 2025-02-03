import React, { useEffect, useState } from "react";
import { fetchPrescriptions, updatePrescription, deletePrescription } from "../firebase/PrescriptionFunction";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/Firebase"; 

const AppointmentPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ service: "", location: "", date: "", time: "" });


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "appointments"), (snapshot) => {
      setPrescriptions(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe(); 
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await deletePrescription(id);
      setPrescriptions((prev) => prev.filter((prescription) => prescription.id !== id));
    } catch (error) {
      console.error("Error deleting prescription:", error);
    }
  };

  
  const handleEdit = (prescription) => {
    setEditingId(prescription.id);
    setEditData({ ...prescription }); 
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePrescription(editingId, editData);
      setPrescriptions((prev) =>
        prev.map((item) => (item.id === editingId ? { id: editingId, ...editData } : item))
      );
      setEditingId(null); 
    } catch (error) {
      console.error("Error updating prescription:", error);
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Appointment History</h1>
      <hr className="border-t-2 border-gray-300 mb-6" />

      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Service</th>
            <th className="px-4 py-2 text-left">Location</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Time</th>
            <th className="px-4 py-2 text-left">Edit</th>
            <th className="px-4 py-2 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.id}>
              <td className="px-4 py-2">{prescription.service}</td>
              <td className="px-4 py-2">{prescription.location}</td>
              <td className="px-4 py-2">{prescription.date}</td>
              <td className="px-4 py-2">{prescription.time}</td>
              <td className="px-4 py-2">
                <button 
                  onClick={() => handleEdit(prescription)} 
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
              </td>
              <td className="px-4 py-2">
                <button 
                  onClick={() => handleDelete(prescription.id)} 
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {editingId && (
        <form onSubmit={handleEditSubmit} className="p-4 bg-gray-50 rounded-md mt-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Edit Appointment</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Service:</label>
            <input
              type="text"
              name="service"
              value={editData.service}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Location:</label>
            <input
              type="text"
              name="location"
              value={editData.location}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date:</label>
            <input
              type="date"
              name="date"
              value={editData.date}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Time:</label>
            <input
              type="time"
              name="time"
              value={editData.time}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-6 py-2 mt-4 rounded-md hover:bg-green-600">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default AppointmentPage;
