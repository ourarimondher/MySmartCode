import React, { useState, useEffect } from 'react'; 

function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('courses');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [fullName, setFullName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');

  useEffect(() => {
    fetchCourses();
    fetchStudents();
  }, [refresh]);

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/courses/');
      const data = await res.json();
      setCourses(data); // on trie côté affichage
    } catch (error) {
      console.error('Erreur récupération cours :', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/students/');
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error('Erreur récupération étudiants :', error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      alert('Titre et fichier requis');
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/api/courses/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setTitle('');
        setFile(null);
        setRefresh(!refresh);
      } else {
        alert('Erreur : ' + data.message);
      }
    } catch (error) {
      console.error('Erreur upload :', error);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm('Supprimer ce cours ?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setRefresh(!refresh);
      }
    } catch (err) {
      console.error('Erreur suppression cours :', err);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm('Supprimer cet étudiant ?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/students/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setRefresh(!refresh);
      }
    } catch (err) {
      console.error('Erreur suppression étudiant :', err);
    }
  };

  const addStudent = async (e) => {
    e.preventDefault();
    if (!fullName || !studentEmail || !studentPassword) {
      alert('Tous les champs sont obligatoires');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/students/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email: studentEmail, password: studentPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Étudiant ajouté avec succès');
        setFullName('');
        setStudentEmail('');
        setStudentPassword('');
        setRefresh(!refresh);
      } else {
        alert('Erreur : ' + data.message);
      }
    } catch (err) {
      console.error('Erreur ajout étudiant :', err);
    }
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div style={pageContainer}>
      <header style={headerStyle}>
        <div style={logoStyle}>MySmartCode</div>
        <div style={pageTitleStyle}>Espace Admin</div>
      </header>

      <nav style={navStyle}>
        <button
          onClick={() => setSelectedTab('courses')}
          style={{ ...navButtonStyle, ...(selectedTab === 'courses' ? navButtonActive : {}) }}
        >
          Gestion des cours
        </button>
        <button
          onClick={() => setSelectedTab('students')}
          style={{ ...navButtonStyle, ...(selectedTab === 'students' ? navButtonActive : {}) }}
        >
          Gestion des étudiants
        </button>
        <button onClick={handleLogout} style={{ ...navButtonStyle, marginLeft: 'auto', backgroundColor: '#dc3545' }}>
          Déconnexion
        </button>
      </nav>

      <main style={mainContentStyle}>
        {selectedTab === 'courses' && (
          <>
            <h2>Téléverser un cours</h2>
            <form onSubmit={handleUpload} style={formStyle}>
              <input
                type="text"
                placeholder="Titre du cours"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={inputStyle}
              />
              <input type="file" onChange={(e) => setFile(e.target.files[0])} required style={inputStyle} />
              <button type="submit" style={submitButtonStyle}>
                Téléverser
              </button>
            </form>

            <h3>Liste des cours</h3>
            <ul style={listStyle}>
              {courses.slice().reverse().map((course) => (
                <li key={course._id} style={listItemStyle}>
                  <strong>{course.title}</strong>
                  <div style={buttonGroupStyle}>
                    <button
                      onClick={() => window.open(`http://localhost:5000/uploads/${course.filename}`, '_blank')}
                      style={showButtonStyle}
                      title="Afficher le cours"
                    >
                      Afficher
                    </button>
                    <button
                      onClick={() => deleteCourse(course._id)}
                      style={deleteButtonStyle}
                      title="Supprimer cours"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {selectedTab === 'students' && (
          <>
            <h2>Ajouter un étudiant</h2>
            <form onSubmit={addStudent} style={formStyle}>
              <input
                type="text"
                placeholder="Nom complet"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                required
                style={inputStyle}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
                required
                style={inputStyle}
              />
              <button type="submit" style={submitButtonStyle}>
                Ajouter
              </button>
            </form>

            <h3>Liste des étudiants</h3>
            <ul style={listStyle}>
              {students.map((student) => (
                <li key={student._id} style={listItemStyle}>
                  {student.fullName} ({student.email})
                  <button
                    onClick={() => deleteStudent(student._id)}
                    style={deleteButtonStyle}
                    title="Supprimer étudiant"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </>
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
  backgroundColor: '#007bff',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const navButtonActive = {
  backgroundColor: '#28a745',
};

const mainContentStyle = {
  padding: 30,
  flexGrow: 1,
  overflowY: 'auto',
  color: '#212529',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  maxWidth: 400,
  marginBottom: 30,
};

const inputStyle = {
  padding: '10px 15px',
  fontSize: 16,
  borderRadius: 5,
  border: '1px solid #ced4da',
  outline: 'none',
  transition: 'border-color 0.3s ease',
};

const submitButtonStyle = {
  padding: '12px 0',
  backgroundColor: '#007bff',
  border: 'none',
  borderRadius: 5,
  color: 'white',
  fontWeight: '600',
  fontSize: 16,
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
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

const buttonGroupStyle = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
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
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const deleteButtonStyle = {
  backgroundColor: '#dc3545',
  border: 'none',
  borderRadius: 5,
  color: 'white',
  cursor: 'pointer',
  padding: '6px 12px',
  fontWeight: '600',
  fontSize: 14,
  transition: 'background-color 0.3s ease',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default AdminDashboard;
