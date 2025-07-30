const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// 📥 Upload d’un cours (admin uniquement)
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Aucun fichier uploadé' });
    }

    const newCourse = new Course({
      title,
      description,
      filename: file.filename,
      uploadDate: new Date(),
    });

    await newCourse.save();
    res.status(201).json({ message: 'Cours uploadé avec succès', course: newCourse });
  } catch (error) {
    console.error('Erreur upload cours :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 📤 Récupération de tous les cours
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ uploadDate: -1 });
    res.json(courses);
  } catch (error) {
    console.error('Erreur récupération cours :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🗑️ Suppression d’un cours
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Cours introuvable' });

    // Supprimer le fichier du dossier uploads/
    const filePath = path.join(__dirname, '..', 'uploads', course.filename);
    fs.unlink(filePath, (err) => {
      if (err) console.warn('Fichier non supprimé :', err.message);
    });

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cours supprimé avec succès' });
  } catch (error) {
    console.error('Erreur suppression cours :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
