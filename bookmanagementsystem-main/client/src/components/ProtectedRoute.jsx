// ...existing code...
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = !!localStorage.getItem("user");
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
// ...existing code...