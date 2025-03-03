import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/Firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtection = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      const user = auth.currentUser;
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, []);

  if (loading) return <p>Loading...</p>;

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminProtection;
