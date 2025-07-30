// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware pour protéger les routes de l'admin
function adminAuth(req, res, next) {
  const { email } = req.body;

  if (email === 'admin@gmail.com') {
    return next(); // autorisé
  }

  return res.status(403).json({ message: 'Accès interdit (admin uniquement)' });
}

// Middleware générique à ajouter si tu utilises JWT plus tard
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // format: "Bearer token"

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // tu pourras accéder à req.user.id, etc.
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token invalide' });
  }
}

module.exports = {
  adminAuth,
  verifyToken
};
