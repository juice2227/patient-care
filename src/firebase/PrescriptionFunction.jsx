import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase"; // Import your initialized Firestore instance

// Fetch all prescriptions
export const fetchPrescriptions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "prescriptions"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    return [];
  }
};

// Add a new prescription
export const addPrescription = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "prescriptions"), data);
    return docRef.id; // Return the ID of the new document
  } catch (error) {
    console.error("Error adding prescription:", error);
  }
};

// Update a prescription
export const updatePrescription = async (id, updatedData) => {
  try {
    const prescriptionRef = doc(db, "prescriptions", id);
    await updateDoc(prescriptionRef, updatedData);
    console.log("Prescription updated!");
  } catch (error) {
    console.error("Error updating prescription:", error);
  }
};

// Delete a prescription
export const deletePrescription = async (id) => {
    try {
      const prescriptionRef = doc(db, "prescriptions", id); // Reference the document by its ID
      await deleteDoc(prescriptionRef); // Delete the document
      console.log("Prescription deleted successfully!");
    } catch (error) {
      console.error("Error deleting prescription:", error);
    }
  };
  