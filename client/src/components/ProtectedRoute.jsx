import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, element }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return element;
};

export default ProtectedRoute;
