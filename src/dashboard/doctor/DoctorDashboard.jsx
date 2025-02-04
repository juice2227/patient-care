import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import AppointmentAcceptance from "./AppointmentAcceptance";
import DoctorPrescriptions from "./DoctorPrescriptions";

import ProfileDoctor from "./ProfileDoctor"; 

import { Outlet } from "react-router-dom"; 

const DoctorDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar role="doctor" />

      {/* Main Content */}
      <div className="ml-64 p-4 w-full">
        <Routes>
          
          <Route path="profile" element={<ProfileDoctor />} />
          <Route path="appointments" element={<AppointmentAcceptance />} />
          <Route path="prescriptions" element={<DoctorPrescriptions />} />
          
          <Route index element={<h2>Welcome to your dashboard</h2>} />
        </Routes>

        <Outlet />
      </div>
    </div>
  );
};

export default DoctorDashboard;
