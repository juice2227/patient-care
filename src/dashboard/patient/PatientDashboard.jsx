import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import AppointmentHistory from "./AppointmentHistory";
import Profile from "./PatientProfile";
import Messages from "./AppointmentMessages";
import Prescriptions from "./PrescriptionMessage";
import { Outlet } from "react-router-dom"; // Allows nested components

const PatientDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar role="patient" />

      {/* Main Content */}
      <div className="ml-64 p-4 w-full">
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="appointments" element={<AppointmentHistory />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="messages" element={<Messages />} />
          <Route index element={<h2>Welcome to your dashboard</h2>} />
        </Routes>

        
        <Outlet />
      </div>
    </div>
  );
};

export default PatientDashboard;
