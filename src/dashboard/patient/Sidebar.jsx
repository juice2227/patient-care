import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaClipboardList, FaFilePrescription, FaCommentDots, FaUserMd, FaBell } from "react-icons/fa";
import { db, auth } from "../../firebase/Firebase"; 
import { doc, getDoc } from "firebase/firestore";
import maleAvatar from "../../assets/male-avatar.jpg"; 
import femaleAvatar from "../../assets/female-avatar.jpg"; 

const Sidebar = ({ role ,darkMode }) => {
  const dashboardPath = role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard";
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          setUser(userSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const profileImage = user?.profilePicture || (user?.gender === "female" ? femaleAvatar : maleAvatar);
  
      

  return (
    <div className={`w-64 h-screen p-4 fixed transition-all 
      ${darkMode ? "bg-gray-900 text-white" : "bg-teal-700 text-white"}`}>
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full border-2 border-white" />
        <h3 className="mt-2 font-bold">{user?.firstName} {user?.lastName}</h3>
      </div>

      <ul className="space-y-4">
        <li><Link to={`${dashboardPath}`} className="flex items-center space-x-2 p-2 hover:bg-teal-600"><FaClipboardList /> <span>Dashboard</span></Link></li>
  
        <li><Link to={`${dashboardPath}/appointments`} className="flex items-center space-x-2 p-2 hover:bg-teal-600"><FaClipboardList /> <span>Appointments</span></Link></li>
        <li><Link to={`${dashboardPath}/prescriptions`} className="flex items-center space-x-2 p-2 hover:bg-teal-600"><FaFilePrescription /> <span>Prescriptions</span></Link></li>
        <li><Link to={`${dashboardPath}/messages`} className="flex items-center space-x-2 p-2 hover:bg-teal-600"><FaCommentDots /> <span>Messages</span></Link></li>
        <li><Link to={`${dashboardPath}/reminder`} className="flex items-center space-x-2 p-2 hover:bg-teal-600"><FaBell /> <span>Reminder</span></Link></li>
        <li><Link to="/logout" className="flex items-center space-x-2 p-2 hover:bg-teal-600"><button>Logout</button></Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
