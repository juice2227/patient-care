import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/Firebase"; // Adjust path as needed
import { doc, getDoc } from "firebase/firestore";
import { Navigate, Outlet } from "react-router-dom";

const DoctorProtection = () => {
  const [isDoctor, setIsDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkDoctorAccess = async () => {
      const user = auth.currentUser;
      if (!user) {
        setIsDoctor(false);
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "doctor") {
          setIsDoctor(true);
        } else {
          setIsDoctor(false);
        }
      } catch (error) {
        console.error("Error checking doctor role:", error);
        setIsDoctor(false);
      } finally {
        setLoading(false);
      }
    };

    checkDoctorAccess();
  }, []);

  if (loading) return <p>Loading...</p>;

  return isDoctor ? <Outlet /> : <Navigate to="/login" />;
};

export default DoctorProtection;
