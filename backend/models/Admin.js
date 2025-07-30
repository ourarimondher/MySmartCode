// backend/models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {  // mot de passe hashé
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
