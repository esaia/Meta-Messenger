import React from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const AuthWrapper = ({ children }) => {
  const { currentUser } = useUser();

  return !currentUser ? children : <Navigate to="/" />;
};

export default AuthWrapper;
