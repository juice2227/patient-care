import React, { useEffect, useState } from "react";
import { db } from "../../firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../../firebase/Firebase";
import jsPDF from "jspdf";

const PatientPrescriptions = () => {
    const [currentUser, setCurrentUser] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (!currentUser) return;

    const fetchPrescriptions = async () => {
      try {
        const q = query(collection(db, "prescriptions"), where("patientId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        setPrescriptions(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, [currentUser]);

  const downloadPrescription = (prescription) => {
    const doc = new jsPDF();
    doc.text("Medical Prescription", 20, 20);
    doc.text(`Medicine: ${prescription.medicine}`, 20, 40);
    doc.text(`Dosage: ${prescription.dosage}`, 20, 50);
    doc.text(`Instructions: ${prescription.instructions}`, 20, 60);
    doc.text(`Date: ${new Date(prescription.dateTime).toLocaleString()}`, 20, 70);
    doc.save("prescription.pdf");
  };

  return (
    <div>
      <h1>Patient - View Prescriptions</h1>
      {prescriptions.length > 0 ? (
        prescriptions.map((prescription) => (
          <div key={prescription.id} className="prescription-card">
            <p><strong>Medicine:</strong> {prescription.medicine}</p>
            <p><strong>Dosage:</strong> {prescription.dosage}</p>
            <p><strong>Instructions:</strong> {prescription.instructions}</p>
            <p><strong>Date:</strong> {new Date(prescription.dateTime).toLocaleString()}</p>
            <button onClick={() => downloadPrescription(prescription)}>Download PDF</button>
          </div>
        ))
      ) : (
        <p>No prescriptions available.</p>
      )}
    </div>
  );
};

export default PatientPrescriptions;
