// backend/server.js

require('dotenv').config();
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

// 🚀 Connexion MongoDB + démarrage serveur
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // Ces options ne sont plus nécessaires dans les versions récentes
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connecté');

    await createAdminIfNotExists();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur backend lancé sur http://localhost:${PORT}`);
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
