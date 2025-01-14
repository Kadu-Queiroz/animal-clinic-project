const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../../config/db');
const { JWT_SECRET } = require('../../../config/env');
const router = express.Router();

// Rota de login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  // Verificar usuário no banco de dados
  const query = 'SELECT * FROM admin_users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro no servidor.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    const user = results[0];

    // Verifique a senha (exemplo simples, melhore usando bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Gerar JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  });
});

module.exports = router;
