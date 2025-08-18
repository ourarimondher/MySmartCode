// backend/server.js

require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');

// Import des modèles et routes
const Admin = require('./models/Admin');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// 🔧 Middlewares
app.use(cors());
app.use(express.json());

// 📁 Dossier statique pour les fichiers uploadés
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 📦 API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);

// 🧪 Endpoint de test pour vérifier que le backend fonctionne
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Test réussi ! Backend fonctionne 🚀' });
});

// 🔍 Endpoint de health check pour Render
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running 🚀' });
});

// 🏠 Route racine pour vérifier que le serveur est accessible
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend MySmartCode 🚀');
});

// 🚀 Connexion à MongoDB + démarrage du serveur
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connecté');

    // Créer un admin par défaut si aucun n’existe
    await createAdminIfNotExists();

    const PORT = process.env.PORT || 5000;
    // ⚡ Render exige d’écouter sur 0.0.0.0
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Serveur backend lancé sur port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erreur MongoDB ou serveur :', err);
  }
}

// 🛡️ Création automatique de l’admin (si non existant)
async function createAdminIfNotExists() {
  const adminEmail = 'admin@gmail.com';
  const adminPassword = 'admin123';

  try {
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('ℹ️ Admin déjà existant');
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const newAdmin = new Admin({ email: adminEmail, password: hashedPassword });
    await newAdmin.save();

    console.log('✅ Admin créé automatiquement :', adminEmail);
  } catch (error) {
    console.error('❌ Erreur création admin :', error);
  }
}

// ▶️ Démarrer le serveur
startServer();
