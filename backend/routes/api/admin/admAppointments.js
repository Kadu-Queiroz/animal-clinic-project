const express = require('express');
const router = express.Router();
const db = require('../../../config/db');
const authMiddleware = require('../../../middleware/authMiddleware'); 

// Aplica autenticação a todas as rotas deste arquivo
router.use(authMiddleware);

// Rota para listar todos os agendamentos
router.get('/', (req, res) => {
  const querySql = `
    SELECT 
      a.id, 
      c.name AS client_name, 
      c.email, 
      c.phone, 
      a.appointment_date, 
      a.service 
    FROM 
      appointments a 
    JOIN 
      clients c 
    ON 
      a.client_id = c.id
    ORDER BY 
      a.appointment_date;
  `;

  db.query(querySql, (err, results) => {
    if (err) {
      console.error('Erro ao listar agendamentos:', err);
      return res.status(500).json({ error: 'Erro ao listar agendamentos.' });
    }
    res.json(results);
  });
});

// Rota para atualizar um agendamento
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { appointmentDate, service } = req.body;

  if (!appointmentDate || !service) {
    return res.status(400).json({ error: 'Data e serviço são obrigatórios para atualização.' });
  }

  const updateSql = `
    UPDATE appointments 
    SET appointment_date = ?, service = ?, updated_at = NOW() 
    WHERE id = ?;
  `;

  db.query(updateSql, [appointmentDate, service, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar agendamento:', err);
      return res.status(500).json({ error: 'Erro ao atualizar agendamento.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado.' });
    }

    res.json({ message: 'Agendamento atualizado com sucesso!' });
  });
});

// Rota para excluir um agendamento
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const deleteSql = `
    DELETE FROM appointments 
    WHERE id = ?;
  `;

  db.query(deleteSql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir agendamento:', err);
      return res.status(500).json({ error: 'Erro ao excluir agendamento.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado.' });
    }

    res.json({ message: 'Agendamento excluído com sucesso!' });
  });
});

module.exports = router;
