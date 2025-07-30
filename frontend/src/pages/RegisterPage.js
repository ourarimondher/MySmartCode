import React, { useState } from 'react';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        window.location.href = '/';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Erreur d’inscription :', error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Inscription Étudiant</h2>
        <form onSubmit={handleRegister}>
          <label>Nom complet</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={inputStyle}
          />

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

          <button type="submit" style={buttonStyle}>S’inscrire</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 15 }}>
          Déjà inscrit ?{' '}
          <a href="/" style={{ color: '#007bff' }}>Se connecter</a>
        </p>
      </div>
    </div>
  );
}

// Styles communs
const containerStyle = {
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f2f4f7',
  fontFamily: 'Segoe UI, sans-serif',
};

const cardStyle = {
  width: 400,
  backgroundColor: 'white',
  padding: 30,
  borderRadius: 10,
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  marginBottom: 15,
  border: '1px solid #ccc',
  borderRadius: 5,
  fontSize: 15,
};

const buttonStyle = {
  width: '100%',
  padding: 10,
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: 5,
  fontSize: 16,
  fontWeight: 'bold',
  cursor: 'pointer',
};
