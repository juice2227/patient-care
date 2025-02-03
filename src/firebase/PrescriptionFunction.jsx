import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";


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


export const addPrescription = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "prescriptions"), data);
    return docRef.id; 
  } catch (error) {
    console.error("Error adding prescription:", error);
  }
};


export const updatePrescription = async (id, updatedData) => {
  try {
    const prescriptionRef = doc(db, "prescriptions", id);
    await updateDoc(prescriptionRef, updatedData);
    console.log("Prescription updated!");
  } catch (error) {
    console.error("Error updating prescription:", error);
  }
};


export const deletePrescription = async (id) => {
    try {
      const prescriptionRef = doc(db, "prescriptions", id); 
      await deleteDoc(prescriptionRef); 
      console.log("Prescription deleted successfully!");
    } catch (error) {
      console.error("Error deleting prescription:", error);
    }
  };
  