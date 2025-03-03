import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ allowedRoles, currentUser }) {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setUserRole(currentUser.role);
      console.log("User Role in ProtectedRoute:", currentUser.role);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
