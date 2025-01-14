const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Rota para listar clientes
router.get('/', (req, res) => {
  const query = 'SELECT * FROM clients';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar clientes.' });
    }
    res.json(results);
  });
});

// Rota para adicionar um novo cliente
router.post('/', (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const sql = 'INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)';
  db.query(sql, [name, email, phone], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao adicionar cliente.' });
    }
    res.json({ message: 'Cliente adicionado com sucesso!', clientId: result.insertId });
  });
});

module.exports = router;
