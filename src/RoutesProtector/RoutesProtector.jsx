import React, { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { Navigate } from "react-router-dom";

function RoutesProtector({ children }) {
  const { user, loading } = useContext(LoginContext);
  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoutesProtector;
