import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";
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

/**  
 *  Add a new prescription with validation  
 * @param {Object} data - Prescription data (must include patientId, medicine, dosage, instructions)
 */
export const addPrescription = async (data) => {
  if (!data?.patientId || !data?.medicine || !data?.dosage || !data?.instructions) {
    console.error("Missing required prescription fields!");
    return null;
  }

  try {
    const docRef = await addDoc(collection(db, "prescriptions"), {
      ...data,
      dateTime: serverTimestamp(), //  Auto-generates timestamp
    });

    console.log(" Prescription added successfully:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error(" Error adding prescription:", error);
    return null;
  }
};

/**  
 * Update an existing prescription  
 * @param {string} id - Prescription document ID  
 * @param {Object} updatedData - Fields to update  
 */
export const updatePrescription = async (id, updatedData) => {
  if (!id || !updatedData) {
    console.error(" Invalid prescription ID or data!");
    return;
  }

  try {
    const prescriptionRef = doc(db, "prescriptions", id);
    await updateDoc(prescriptionRef, updatedData);
    console.log(" Prescription updated:", id);
  } catch (error) {
    console.error(" Error updating prescription:", error);
  }
};

/**  
 *  Delete a prescription by ID  
 * @param {string} id - Prescription document ID  
 */
export const deletePrescription = async (id) => {
  if (!id) {
    console.error(" Prescription ID is required for deletion!");
    return;
  }

  try {
    const prescriptionRef = doc(db, "prescriptions", id);
    await deleteDoc(prescriptionRef);
    console.log(" Prescription deleted:", id);
  } catch (error) {
    console.error(" Error deleting prescription:", error);
  }
};
