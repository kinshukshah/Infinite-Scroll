import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Contexts/authContext";

const PrivateRoute = ({ children }) => {
  const { authState } = useAuth();
  console.log({ authState });
  return authState.user ? children : <Navigate replace to="/login" />;
};

export default PrivateRoute;
