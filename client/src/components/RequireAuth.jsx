import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RequireAuth({ children, role }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RequireAuth;
