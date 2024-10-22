const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Usando a conexão centralizada

// Rota para agendar consultas
router.post('/appointments', (req, res) => {
  const { name, email, phone, appointmentDate, service } = req.body;

  if (!name || !email || !phone || !appointmentDate || !service) {
    return res.status(400).json({ error: 'Campos obrigatórios: nome, email, telefone, data da consulta, serviço.' });
  }

  // Primeiro, insere o cliente na tabela clients
  const insertClientSql = 'INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)';
  
  db.query(insertClientSql, [name, email, phone], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao inserir cliente.' });
    }

    const clientId = result.insertId; // Pega o ID do cliente inserido

    // Agora, insere o agendamento na tabela appointments com o client_id
    const insertAppointmentSql = 'INSERT INTO appointments (client_id, appointment_date, service) VALUES (?, ?, ?)';
    
    db.query(insertAppointmentSql, [clientId, appointmentDate, service], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao agendar consulta.' });
      }

      res.json({ message: 'Consulta agendada com sucesso!', appointmentId: result.insertId });
    });
  });
});

module.exports = router;
