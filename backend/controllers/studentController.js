const Student = require('../models/Student');

// Liste des étudiants
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.json(students);
  } catch (error) {
    console.error('Erreur liste étudiants :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un étudiant
exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    await Student.findByIdAndDelete(studentId);
    res.json({ message: 'Étudiant supprimé' });
  } catch (error) {
    console.error('Erreur suppression étudiant :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
