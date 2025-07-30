import React from 'react';

const Layout = ({ title, tabs, selectedTab, onSelectTab, onLogout, children }) => {
  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      maxWidth: 1100,
      margin: '20px auto',
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff'
    }}>
      <header style={{ backgroundColor: '#007bff', padding: '20px 30px', color: 'white' }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>{title}</h1>
      </header>

      <nav style={{ display: 'flex', borderBottom: '1px solid #ddd', backgroundColor: '#f0f0f0' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            style={{
              flex: 1,
              padding: '12px 0',
              backgroundColor: selectedTab === tab.id ? '#28a745' : '#007bff',
              color: 'white',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
        <button
          onClick={onLogout}
          style={{
            padding: '12px 25px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Déconnexion
        </button>
      </nav>

      <main style={{ padding: '30px' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
