import React from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useUser();

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
