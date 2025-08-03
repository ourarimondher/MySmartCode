import React, { useEffect, useState } from 'react';

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Vérifier si l'utilisateur est bien un étudiant connecté
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'student') {
      window.location.href = '/'; // Redirection si non autorisé
      return;
    }
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/courses/');
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error('Erreur récupération cours :', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Supprimer les infos de session
    window.location.href = '/';
  };

  const filteredCourses = courses
    .slice()
    .reverse()
    .filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={pageContainer}>
      <header style={headerStyle}>
        <div style={logoStyle}>MySmartCode</div>
        <div style={pageTitleStyle}>Espace Étudiant</div>
      </header>

      <nav style={navStyle}>
        <button style={{ ...navButtonStyle, backgroundColor: '#28a745' }}>
          Consultation des cours
        </button>
        <button
          onClick={handleLogout}
          style={{ ...navButtonStyle, marginLeft: 'auto', backgroundColor: '#dc3545' }}
        >
          Déconnexion
        </button>
      </nav>

      <main style={mainContentStyle}>
        <h2>Liste des cours disponibles</h2>

        <input
          type="text"
          placeholder="Rechercher un cours..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />

        {filteredCourses.length === 0 ? (
          <p>Aucun cours trouvé.</p>
        ) : (
          <ul style={listStyle}>
            {filteredCourses.map(course => (
              <li key={course._id} style={listItemStyle}>
                <strong>{course.title}</strong>{' '}
                <button
                  onClick={() => window.open(`http://localhost:5000/uploads/${course.filename}`, '_blank')}
                  style={showButtonStyle}
                  title="Afficher le cours"
                >
                  Afficher
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

// Styles
const pageContainer = {
  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  maxWidth: 1100,
  margin: '30px auto',
  boxShadow: '0 0 15px rgba(0,0,0,0.1)',
  borderRadius: 8,
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '80vh',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '20px 30px',
  borderBottom: '1px solid #ddd',
  color: '#212529',
  fontWeight: '700',
  fontSize: '1.5rem',
  userSelect: 'none',
};

const logoStyle = {
  color: '#007bff',
  fontWeight: '700',
};

const pageTitleStyle = {
  color: '#6c757d',
  fontSize: '1.25rem',
  fontWeight: '500',
};

const navStyle = {
  display: 'flex',
  backgroundColor: '#fff',
  padding: '12px 30px',
  gap: '15px',
  borderBottom: '1px solid #ddd',
  userSelect: 'none',
};

const navButtonStyle = {
  flex: '1 1 150px',
  padding: '10px 0',
  fontWeight: '600',
  fontSize: '1rem',
  borderRadius: 5,
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const mainContentStyle = {
  padding: 30,
  flexGrow: 1,
  overflowY: 'auto',
  color: '#212529',
};

const searchInputStyle = {
  marginBottom: 20,
  padding: '10px',
  width: '100%',
  maxWidth: '600px',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  maxWidth: 600,
};

const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 12px',
  borderBottom: '1px solid #eee',
  fontSize: 16,
};

const showButtonStyle = {
  backgroundColor: '#28a745',
  border: 'none',
  borderRadius: 5,
  color: 'white',
  cursor: 'pointer',
  padding: '6px 12px',
  fontWeight: '600',
  fontSize: 14,
  transition: 'background-color 0.3s ease',
};
