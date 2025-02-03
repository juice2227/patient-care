import React, { useEffect, useState } from "react";
import { fetchPrescriptions, updatePrescription, deletePrescription } from "../firebase/PrescriptionFunction";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdEdit ,MdDelete , MdEmail} from "react-icons/md";
const PrescriptionPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ service: "", location: "", date: "", time: "" });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPrescriptions();
      setPrescriptions(data);
    };
    loadData();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await deletePrescription(id);
      setPrescriptions((prev) => prev.filter((prescription) => prescription.id !== id));
    } catch (error) {
      console.error("Error deleting prescription:", error);
    }
  };

  // Handle edit
  const handleEdit = (prescription) => {
    setEditingId(prescription.id);
    setEditData({ ...prescription }); // Populate edit form with selected data
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
      setEditingId(null); // Close edit mode
    } catch (error) {
      console.error("Error updating prescription:", error);
    }
  };

  return (
    <div>
      <div className="border rounded-xl shadow-lg bg-white">
      <FaRegCalendarAlt className='color-custom-green'/>
      <h3 className='flex flex-row'>Appointment History</h3>
      
      
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Service</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Time</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.id}>
              <td className="border border-gray-300 px-4 py-2">{prescription.service}</td>
              <td className="border border-gray-300 px-4 py-2">{prescription.location}</td>
              <td className="border border-gray-300 px-4 py-2">{prescription.date}</td>
              <td className="border border-gray-300 px-4 py-2">{prescription.time}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => handleEdit(prescription)}><MdEdit /></button> |{" "}
                <button onClick={() => handleDelete(prescription.id)}><MdDelete /></button> |{" "}
                <button>Message</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* Request new Appointment*/}
      <div className="border rounded-xl shadow-lg ">
      {editingId && (
        <div >
         <form onSubmit={handleEditSubmit} className="p-4 border mt-4">
          <h2 className="font-bold text-green-500">Request New Appointment</h2>
          <div>
            <label>Service:</label>
            <input
              type="text"
              name="service"
              value={editData.service}
              onChange={handleEditChange}
              required
            />
          </div>
          
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={editData.location}
              onChange={handleEditChange}
              required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={editData.date}
              onChange={handleEditChange}
              required
            />
          </div>
          <div>
            <label>Time:</label>
            <input
              type="time"
              name="time"
              value={editData.time}
              onChange={handleEditChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white p-2">
            Save Changes
          </button>
         </form>
        </div>
      )}
      </div>

    </div>
  );
};

export default PrescriptionPage;
