import React, { useState, useEffect } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirection automatique si déjà connecté
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      window.location.replace("/#/admin");
    } else if (role === "student") {
      window.location.replace("/#/student");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://mysmartcode-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      // Si erreur côté serveur
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.message || "Identifiants invalides !");
        return;
      }

      const data = await res.json();

      if (data.role) {
        // Nettoyer storage
        localStorage.clear();

        // Sauvegarde du rôle et infos
        localStorage.setItem("role", data.role);
        if (data.studentId) {
          localStorage.setItem("studentId", data.studentId);
        }

        // Redirection selon rôle
        if (data.role === "admin") {
          window.location.replace("/#/admin");
        } else {
          window.location.replace("/#/student");
        }
      } else {
        alert("Réponse inattendue du serveur.");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      alert("Impossible de se connecter au serveur.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Se connecter
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 15 }}>
          Pas encore de compte ?{" "}
          <a href="/#/register" style={{ color: "#007bff" }}>
            S’inscrire
          </a>
        </p>
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  display: "flex",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f2f4f7",
  fontFamily: "Segoe UI, sans-serif",
};

const cardStyle = {
  width: 400,
  backgroundColor: "white",
  padding: 30,
  borderRadius: 10,
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: 15,
  border: "1px solid #ccc",
  borderRadius: 5,
  fontSize: 15,
};

const buttonStyle = {
  width: "100%",
  padding: 10,
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: 5,
  fontSize: 16,
  fontWeight: "bold",
  cursor: "pointer",
};
