const bcrypt = require('bcryptjs');
const Student = require('../models/Student');

// Connexion (admin ou étudiant)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Connexion admin
  if (email === 'admin@gmail.com' && password === 'admin123') {
    return res.status(200).json({ message: 'Admin connecté', role: 'admin' });
  }

  // Connexion étudiant
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    res.status(200).json({
      message: 'Étudiant connecté',
      role: 'student',
      studentId: student._id,
    });
  } catch (error) {
    console.error('Erreur login étudiant :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Inscription étudiant
exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({ fullName, email, password: hashedPassword });

    await newStudent.save();

    res.status(201).json({ message: 'Inscription réussie' });
  } catch (error) {
    console.error('Erreur inscription :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
