const db = require('../config/db');

const listAppointments = (req, res) => {
  const query = 'SELECT * FROM appointments';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar agendamentos.' });
    res.json(results);
  });
};

module.exports = { listAppointments };
