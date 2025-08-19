import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
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
          }
        />
      </Routes>
    </Router>
  );
}
