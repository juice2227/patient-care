// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import jsPDF from "jspdf";

const PrescriptionMessage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(" Logged in user:", user.uid);
        setCurrentUser(user);
      } else {
        console.warn("⚠️ No user logged in");
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    if (!currentUser) return;

    const fetchPrescriptions = async () => {
      setLoading(true);
      try {
        console.log(`Fetching prescriptions for: ${currentUser.uid}`);

        const q = query(collection(db, "prescriptions"), where("patientId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.warn(" No prescriptions found for this patient.");
        } else {
          console.log(` ${querySnapshot.docs.length} prescriptions found.`);
        }

        const fetchedPrescriptions = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            dateTime: data.dateTime?.toDate ? data.dateTime.toDate() : new Date(), 
          };
        });

        console.table(fetchedPrescriptions);
        setPrescriptions(fetchedPrescriptions);
      } catch (error) {
        console.error(" Error fetching prescriptions:", error);
      }
      setLoading(false);
    };

    fetchPrescriptions();
  }, [currentUser]);

  // Download Prescription as PDF
  const downloadPrescription = (prescription) => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.text("Medical Prescription", 20, 20);
    doc.setFont("helvetica", "normal");

    doc.text(` Patient: ${prescription.patientName}`, 20, 40); 
    doc.text(` Medicine: ${prescription.medicine}`, 20, 50);
    doc.text(`Dosage: ${prescription.dosage}`, 20, 60);
    doc.text(` Instructions: ${prescription.instructions}`, 20, 70);
    doc.text(`Date: ${prescription.dateTime.toLocaleString()}`, 20, 80);

    doc.save(`prescription_${prescription.id}.pdf`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Patient - View Prescriptions</h1>

      {loading ? (
        <p className="text-gray-500">Loading prescriptions...</p>
      ) : prescriptions.length > 0 ? (
        prescriptions.map((prescription) => (
          <div key={prescription.id} className="p-4 border rounded-md shadow-md mb-4 bg-gray-100">
            <p><strong> Patient:</strong> {prescription.patientName}</p>
            <p><strong> Medicine:</strong> {prescription.medicine}</p>
            <p><strong> Dosage:</strong> {prescription.dosage}</p>
            <p><strong> Instructions:</strong> {prescription.instructions}</p>
            <p><strong> Date:</strong> {prescription.dateTime.toLocaleString()}</p>
            <button 
              onClick={() => downloadPrescription(prescription)} 
              className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Download PDF
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No prescriptions available.</p>
      )}
    </div>
  );
};

export default PrescriptionMessage;
