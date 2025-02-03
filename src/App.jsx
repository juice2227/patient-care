import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Register from "./components/Registration";

import DoctorDashboard from "./dashboard/doctor/DoctorDashboard";

import PatientDashboard from "./dashboard/patient/PatientDashboard";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");
    if (!hasSeenSplash) {
      setShowSplash(true);
      localStorage.setItem("hasSeenSplash", "true");
    } else {
      setShowSplash(false);
    }
  }, []);

  // Get authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await fetchUserRole(user.uid);
      } else {
        setCurrentUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch user role from Firestore
  const fetchUserRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setRole(userDoc.data().role);
      }
    } catch (error) {
      console.error("Error fetching role:", error);
    }
  };

  // Show a loading state to prevent incorrect redirections
  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Redirect to login if not authenticated */}
        {!currentUser ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            {/* Redirect based on role */}
            {role === "doctor" ? (
              <>
                <Route path="/doctor-dashboard/" element={<DoctorDashboard />} />
              </>
            ) : role === "patient" ? (
              <>
                <Route path="/patient-dashboard/" element={<PatientDashboard />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/register" />} />
            )}
          </>
        )}
      </Routes>

      {/* Show splash screen only if needed */}
      {showSplash && <SplashScreen />}
    </Router>
  );
}
