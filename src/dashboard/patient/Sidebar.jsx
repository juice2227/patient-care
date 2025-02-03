import { Link } from "react-router-dom";
import { FaClipboardList, FaFilePrescription, FaCommentDots, FaUserMd } from "react-icons/fa";

const Sidebar = ({ role }) => {
  const dashboardPath = role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard";

  return (
    <div className="w-64 bg-teal-700 text-white h-screen p-4 fixed">
      <h2 className="text-xl font-bold mb-6">DawaMed</h2>
      <ul className="space-y-4">
        <li><Link to={`${dashboardPath}/profile`} className="flex items-center space-x-2 p-2 hover:bg-teal-600"><FaUserMd /> <span>Profile</span></Link></li>
        <li><Link to={`${dashboardPath}/appointments`} className="flex items-center space-x-2 p-2 hover:bg-teal-600"><FaClipboardList /> <span>Appointments</span></Link></li>
        <li><Link to={`${dashboardPath}/prescriptions`} className="flex items-center space-x-2 p-2 hover:bg-teal-600"><FaFilePrescription /> <span>Prescriptions</span></Link></li>
        <li><Link to={`${dashboardPath}/messages`} className="flex items-center space-x-2 p-2 hover:bg-teal-600"><FaCommentDots /> <span>Messages</span></Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
