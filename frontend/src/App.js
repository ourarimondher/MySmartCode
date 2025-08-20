<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';

// 🔒 Composant pour protéger les routes
function ProtectedRoute({ children, role }) {
  const storedRole = localStorage.getItem('role');

  if (!storedRole) {
    // pas connecté → retour au login
    return <Navigate to="/" replace />;
  }

  if (role && storedRole !== role) {
    // connecté mais pas le bon rôle → retour login
    return <Navigate to="/" replace />;
  }

  return children;
}
=======
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import PrivateRoute from "./components/PrivateRoute";
>>>>>>> 9d4798899de4ea789d5e01ec06657ae969674901

export default function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Espace admin protégé */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Espace étudiant protégé */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
=======
        {/* Page de connexion */}
        <Route path="/" element={<LoginPage />} />

        {/* Page d'inscription */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard admin (protégé) */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Dashboard étudiant (protégé) */}
        <Route
          path="/student"
          element={
            <PrivateRoute allowedRole="student">
              <StudentDashboard />
            </PrivateRoute>
>>>>>>> 9d4798899de4ea789d5e01ec06657ae969674901
          }
        />
      </Routes>
    </Router>
  );
}
