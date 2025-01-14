const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');

router.use(authenticate);

router.get('/dashboard', (req, res) => {
  res.json({ message: 'Bem-vindo ao painel administrativo!' });
});

module.exports = router;
