import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Assuming the context is in this path

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Check if user is authenticated


  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if user is not authenticated
  }

  return children; // Return the protected route if user is authenticated
};

export default PrivateRoute; // Make sure it's a default export
