const Course = require('../models/Course');

// Upload d’un cours (admin uniquement)
exports.uploadCourse = async (req, res) => {
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
    res.status(201).json({ message: 'Cours uploadé', course: newCourse });
  } catch (error) {
    console.error('Erreur upload cours :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Liste des cours
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ uploadDate: -1 });
    res.json(courses);
  } catch (error) {
    console.error('Erreur liste cours :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un cours
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    await Course.findByIdAndDelete(courseId);
    res.json({ message: 'Cours supprimé' });
  } catch (error) {
    console.error('Erreur suppression cours :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
