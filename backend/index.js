const express = require('express');
const app = express();
const PORT = 5000;

// Importar a conexão com o banco de dados
const db = require('./config/db'); // Verifique se o caminho está correto

// Importar as rotas da pasta "routes"
const appointmentRoutes = require('./routes/appointments');

// Middleware para interpretar JSON
app.use(express.json());

// Usar as rotas de agendamento
app.use('/appointments', appointmentRoutes);

// Testar rota para listar clientes
app.get('/clients', (req, res) => {
  const query = 'SELECT * FROM clients';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar clientes:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar clientes.' });
    }
    res.json(results);
  });
});

// Nova rota para adicionar clientes (POST request)
app.post('/clients', (req, res) => {
  const { name, email, phone } = req.body;

  // Verificar se os dados foram enviados corretamente
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Por favor, envie todos os campos necessários: name, email e phone.' });
  }

  const sql = 'INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)';
  
  db.query(sql, [name, email, phone], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar cliente:', err.message);
      return res.status(500).json({ error: 'Erro ao adicionar cliente.' });
    }
    res.json({ message: 'Cliente adicionado com sucesso!', clientId: result.insertId });
  });
});

// Nova rota para agendar consulta (POST request)
app.post('/appointments', (req, res) => {
  const { client_id, appointment_date, service } = req.body;

  // Verificar se os dados foram enviados corretamente
  if (!client_id || !appointment_date || !service) {
    return res.status(400).json({ error: 'Por favor, envie todos os campos necessários: client_id, appointment_date, service.' });
  }

  const sql = 'INSERT INTO appointments (client_id, appointment_date, service) VALUES (?, ?, ?)';
  
  db.query(sql, [client_id, appointment_date, service], (err, result) => {
    if (err) {
      console.error('Erro ao agendar consulta:', err.message);
      return res.status(500).json({ error: 'Erro ao agendar consulta.' });
    }
    res.json({ message: 'Consulta agendada com sucesso!', appointmentId: result.insertId });
  });
});

// Iniciar o servidor (somente uma vez)
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
