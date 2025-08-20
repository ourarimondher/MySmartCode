// frontend/src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // récupère le token
  if (!token) {
    return <Navigate to="/" />; // redirige vers login si non connecté
  }
  return children;
}
