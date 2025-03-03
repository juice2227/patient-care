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
import AdminPanel from "./dashboard/admin/AdminPanel";
import AuthorizedLayout from "./authentication/AuthorizedLayout";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
 
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUserRole(userData.role);
            setCurrentUser({ ...user, role: userData.role });
          } else {
            console.error("No user data found in Firestore");
            setCurrentUser(null);
            setUserRole(null);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setCurrentUser(null);
          setUserRole(null);
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });
 
    return () => unsubscribe();
  }, []);
 
  if (loading) {
    return <SplashScreen />;
  }

  // Function to determine redirect based on user role
  const getRedirectPath = () => {
    if (userRole === "admin") return "/admin-panel";
    if (userRole === "doctor") return "/doctor-dashboard";
    return "/patient-dashboard";
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={
            currentUser ? (
              <Navigate to={getRedirectPath()} replace />
            ) : (
              <Login />
            )
          } 
        />
        <Route 
          path="/register" 
          element={
            currentUser ? (
              userRole === "patient" ? (
                <Navigate to="/patient-dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Registration />
            )
          } 
        />

        {/* Protected routes with improved structure */}
        <Route element={<AuthorizedLayout currentUser={currentUser} />}>
          <Route
            path="/admin-panel/*"
            element={
              currentUser && userRole === "admin" ? (
                <AdminPanel />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/doctor-dashboard/*"
            element={
              currentUser && userRole === "doctor" ? (
                <DoctorDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/patient-dashboard/*"
            element={
              currentUser && userRole === "patient" ? (
                <PatientDashboard darkMode={darkMode} setDarkMode={setDarkMode} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Route>

        {/* Catch-all route */}
        <Route 
          path="*" 
          element={
            currentUser ? (
              <Navigate to={getRedirectPath()} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
    </Router>
    </div>
  );
}