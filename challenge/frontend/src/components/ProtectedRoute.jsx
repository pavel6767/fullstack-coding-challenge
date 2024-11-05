import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/User";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return user.id ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;