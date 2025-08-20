// backend/routes/testRoutes.js
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Test réussi ! Backend fonctionne ✅' });
});

module.exports = router;
