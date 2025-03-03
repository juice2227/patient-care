import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import AppointmentHistory from "./AppointmentHistory";
import PatientProfile from "./PatientProfile";
import AppointmentMessages from "./AppointmentMessages";
import PrescriptionMessage from "./PrescriptionMessage";
import { Outlet } from "react-router-dom"; 
import Logout from "../../authentication/Logout";
import DashboardSummary from "./DashboardSummary";
import Notifications from "../../components/Notifications";
import Setting from "../../components/Setting";

const PatientDashboard = ({ darkMode, setDarkMode }) => {
  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <Sidebar role="patient" darkMode= {darkMode}/>
      <div className="flex flex-col w-full ml-64">
        <div className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold"></h2>
          <div className="flex space-x-6">
            <Notifications />
            <Setting darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>

        <div className="p-6">
          <Routes>
            <Route index element={<DashboardSummary />} />
            <Route path="logout" element={<Logout />} />
            <Route path="profile" element={<PatientProfile />} />
            <Route path="appointments" element={<AppointmentHistory />} />
            <Route path="prescriptions" element={<PrescriptionMessage />} />
            <Route path="messages" element={<AppointmentMessages />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
