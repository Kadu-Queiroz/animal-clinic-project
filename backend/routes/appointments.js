const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Rota para agendar consultas
router.post('/appointments', (req, res) => {
  const { name, email, phone, appointmentDate, service } = req.body;

  if (!name || !email || !phone || !appointmentDate || !service) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios: nome, email, telefone, data da consulta e serviço.' });
  }

  // Verificar se já existe uma consulta no mesmo horário
  const checkAvailabilitySql = 'SELECT * FROM appointments WHERE appointment_date = ?';

  db.query(checkAvailabilitySql, [appointmentDate], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao verificar disponibilidade. Por favor, tente novamente mais tarde.' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'Horário indisponível. Por favor, escolha outro horário.' });
    }

    // Insere o cliente na tabela clients
    const insertClientSql = 'INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)';

    db.query(insertClientSql, [name, email, phone], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao salvar dados do cliente. Por favor, tente novamente.' });
      }

      const clientId = result.insertId;

      // Insere o agendamento na tabela appointments com o client_id
      const insertAppointmentSql = 'INSERT INTO appointments (client_id, appointment_date, service) VALUES (?, ?, ?)';

      db.query(insertAppointmentSql, [clientId, appointmentDate, service], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao agendar consulta. Por favor, tente novamente.' });
        }

        res.json({ message: 'Consulta agendada com sucesso!', appointmentId: result.insertId });
      });
    });
  });
});

module.exports = router;
