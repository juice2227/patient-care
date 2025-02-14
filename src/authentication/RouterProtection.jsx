import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RouterProtection = ({ role, requiredRole }) => {
  if (!role) {
    return <div>Loading...</div>; // Prevents access check before role is set
  }

  const hasAccess = requiredRole.includes(role);
  return hasAccess ? <Outlet /> : <Navigate to="/login" />;
};

export default RouterProtection;
