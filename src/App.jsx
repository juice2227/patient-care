import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import SplashScreen from "./components/SplashScreen";
import Login from "./authentication/Login";
import Registration from "./authentication/Registration";
import DoctorDashboard from "./dashboard/doctor/DoctorDashboard";
import PatientDashboard from "./dashboard/patient/PatientDashboard";
import AuthorizedLayout from "./authentication/AuthorizedLayout";
import RouterProtection from "./authentication/RouterProtection";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");
    if (!hasSeenSplash) {
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem("hasSeenSplash", "true");
      }, 3000); // Show splash for 3 seconds
    }
  }, []);

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

  const fetchUserRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setRole(userDoc.data().role);
        console.log("Fetched Role:", userDoc.data().role); 
      } else {
        console.log("User role not found.");
      }
    } catch (error) {
      console.error("Error fetching role:", error);
    }
  };

  if (loading || showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <Routes>
    
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<Navigate to="/login" />} />

        
        {currentUser && (
          <Route element={<AuthorizedLayout currentUser={currentUser} />}>
            
            <Route element={<RouterProtection role={role} requiredRole={["doctor"]} />}>
              <Route path="/doctor-dashboard/*" element={<DoctorDashboard />} />
            </Route>

            
            <Route element={<RouterProtection role={role} requiredRole={["patient"]} />}>
              <Route path="/patient-dashboard/*" element={<PatientDashboard />} />
            </Route>
          </Route>
        )}
      </Routes>
    </Router>
  );
}
