// backend/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');

// ✅ GET - Lister tous les étudiants (sans mot de passe)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().select('-password').sort({ fullName: 1 });
    res.json(students);
  } catch (error) {
    console.error('Erreur récupération étudiants :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ POST - Ajouter un étudiant (par admin)
router.post('/', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Champs obligatoires manquants' });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({ fullName, email, password: hashedPassword });
    await newStudent.save();

    res.status(201).json({ message: 'Étudiant ajouté avec succès', student: newStudent });
  } catch (error) {
    console.error('Erreur ajout étudiant :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ DELETE - Supprimer un étudiant
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Étudiant supprimé' });
  } catch (error) {
    console.error('Erreur suppression étudiant :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
