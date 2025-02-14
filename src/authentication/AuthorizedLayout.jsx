import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthorizedLayout = ({ currentUser }) => {
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthorizedLayout;
