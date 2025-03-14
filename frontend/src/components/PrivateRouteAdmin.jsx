import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Assuming the context is in this path

const PrivateRoute = ({ children }) => {
  const {  admin } = useContext(AuthContext); // Check if user is authenticated

  console.log(admin)

  if(!admin) {
    return <Navigate to="/adminlogin" />
  }

  return children; // Return the protected route if user is authenticated
};

export default PrivateRoute; // Make sure it's a default export
