const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Rota para agendar consultas
router.post('/', (req, res) => {
  const { name, email, phone, appointmentDate, service } = req.body;

  // Log dos dados recebidos para debug
  console.log('Dados da consulta recebidos:', { name, email, phone, appointmentDate, service });

  if (!name || !email || !phone || !appointmentDate || !service) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios: nome, email, telefone, data da consulta e serviço.' });
  }

  // Verificar se já existe uma consulta no mesmo horário
  const checkAvailabilitySql = 'SELECT * FROM appointments WHERE DATE_FORMAT(appointment_date, "%Y-%m-%d %H:%i") = ?';

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

// Rota para obter horários disponíveis
router.get('/available-times', (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: 'Data é obrigatória para verificar disponibilidade.' });
  }

  try {
    // Converte a data de DD-MM-YYYY para YYYY-MM-DD
    const [day, month, year] = date.split('-');
    const formattedDate = `${year}-${month}-${day}`;

    // Consulta para obter horários já ocupados na data fornecida
    const querySql = 'SELECT appointment_date FROM appointments WHERE DATE(appointment_date) = ?';

    db.query(querySql, [formattedDate], (err, results) => {
      if (err) {
        console.error('Erro na consulta SQL:', err);
        return res.status(500).json({ error: 'Erro ao verificar horários disponíveis.' });
      }

      // Define todos os horários disponíveis das 8h às 17h
      const allTimes = [
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
      ];

      // Filtra os horários ocupados da data
      const occupiedTimes = results.map(row => new Date(row.appointment_date).toTimeString().substring(0, 5));
      const availableTimes = allTimes.filter(time => !occupiedTimes.includes(time));

      res.json({ availableTimes });
    });
  } catch (error) {
    console.error('Erro ao processar data ou consulta:', error);
    res.status(500).json({ error: 'Erro ao verificar horários disponíveis.' });
  }
});

module.exports = router;
