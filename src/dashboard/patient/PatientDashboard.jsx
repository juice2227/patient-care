import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import AppointmentHistory from "./AppointmentHistory";
import PatientProfile from "./PatientProfile";
import AppointmentMessages from "./AppointmentMessages";
import PrescriptionMessage from "./PrescriptionMessage";
import { Outlet } from "react-router-dom"; // Allows nested components
import Logout from "../../authentication/Logout";


const PatientDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar role="patient" />

      {/* Main Content */}
      <div className="ml-64 p-4 w-full">
        <Routes>
          
          <Route path="logout" element={<Logout/>}/>
          <Route path="profile" element={<PatientProfile />} />
          <Route path="appointments" element={<AppointmentHistory />} />
          <Route path="prescriptions" element={<PrescriptionMessage />} />
          <Route path="messages" element={<AppointmentMessages />} />
          <Route index element={<h2>Welcome to your dashboard</h2>} />
        </Routes>

        
        <Outlet />
      </div>
    </div>
  );
};

export default PatientDashboard;
