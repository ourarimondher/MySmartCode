import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, allowedRole }) {
  const role = localStorage.getItem('role');
  if (!role || role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  return children;
}
