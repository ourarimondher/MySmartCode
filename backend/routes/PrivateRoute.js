import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowedRole }) {
  const role = localStorage.getItem("role");

  // Vérifie si utilisateur connecté et a le bon rôle
  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
