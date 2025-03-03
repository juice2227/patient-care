import { useState, useEffect } from "react";
import { auth, db } from "../../firebase/Firebase";
import { signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [doctor, setDoctor] = useState({ name: "", email: "", specialization: "" });
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const doctorList = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.role === "doctor");
      setDoctors(doctorList);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);
    const tempPassword = generateRandomPassword();

    try {
      // First store the doctor's info in Firestore with a temporary ID
      const doctorRef = doc(collection(db, "users"));
      
      // Create Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        doctor.email,
        tempPassword
      );

      // Update Firestore with the auth UID
      await setDoc(doctorRef, {
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        role: "doctor",
        uid: userCredential.user.uid,
        createdAt: new Date().toISOString()
      });

      // Reset form and update doctor list
      setDoctor({ name: "", email: "", specialization: "" });
      fetchDoctors();

      alert(`Doctor added successfully!\nEmail: ${doctor.email}\nTemporary password: ${tempPassword}\nPlease share these credentials securely.`);

      // Re-authenticate admin (if needed)
      if (!auth.currentUser) {
        navigate("/login");
      }
    } catch (error) {
      alert("Error adding doctor: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await deleteDoc(doc(db, "users", id));
      fetchDoctors();
      alert("Doctor removed successfully!");
    } catch (error) {
      alert("Error removing doctor: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Doctors</h2>
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Logout
        </button>
      </div>

      {/* Add Doctor Form */}
      <form onSubmit={handleAddDoctor} className="flex flex-col">
        <input
          type="text"
          name="name"
          placeholder="Doctor's Name"
          value={doctor.name}
          onChange={handleChange}
          className="mb-2 p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Doctor's Email"
          value={doctor.email}
          onChange={handleChange}
          className="mb-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization (e.g., Cardiologist)"
          value={doctor.specialization}
          onChange={handleChange}
          className="mb-2 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Doctor"}
        </button>
      </form>

      {/* Doctors List */}
      <h3 className="text-xl font-semibold mt-6 mb-2">Existing Doctors</h3>
      <ul>
        {doctors.map((doc) => (
          <li key={doc.id} className="flex justify-between p-2 border-b">
            <span>
              {doc.name} - {doc.specialization}
            </span>
            <button
              onClick={() => handleDeleteDoctor(doc.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;