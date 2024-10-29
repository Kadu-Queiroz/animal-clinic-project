const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Conexão centralizada

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
