import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 w-full p-6">
        <Outlet /> {/* This dynamically loads the selected component */}
      </div>
    </div>
  );
};

export default Dashboard;
