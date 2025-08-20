// backend/server.js

require('dotenv').config();        // Charger les variables d'environnement depuis .env
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// 🌐 Route racine pour tester dans navigateur
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend MySmartCode 🚀');
});

// 📦 Définition des routes API
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);

// 🚀 Fonction principale : connexion MongoDB + démarrage serveur
async function startServer() {
  try {
    // Connexion à MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connecté');

    // Créer automatiquement l'administrateur si inexistant
    await createAdminIfNotExists();

    // PORT dynamique pour Render
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur backend lancé sur le port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erreur MongoDB ou serveur :', err);
  }
}

// 🛡️ Création automatique de l’admin
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

// ▶️ Lancer le serveur
startServer();
