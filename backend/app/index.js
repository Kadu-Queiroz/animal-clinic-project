const express = require('express');
const app = express();
const PORT = 5000;

// Configurações globais
require('dotenv').config(); // Gerencia variáveis de ambiente
const db = require('./app/config/db'); // Conexão com o banco de dados

// Middlewares
app.use(express.json()); // Interpreta JSON no corpo da requisição
app.use(express.urlencoded({ extended: true })); // Interpreta dados codificados em URLs

// Rotas
const appointmentRoutes = require('./app/routes/appointments'); // Rotas de agendamento
const adminRoutes = require('./app/routes/admin'); // Rotas administrativas
const clientRoutes = require('./app/routes/clients'); // Rotas relacionadas a clientes

// Utilizar as rotas
app.use('/api/appointments', appointmentRoutes); // Rotas para CRUD de agendamentos
app.use('/api/admin', adminRoutes); // Rotas administrativas com autenticação
app.use('/api/clients', clientRoutes); // Rotas para clientes

// Rota principal para teste
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo ao sistema da Clínica Veterinária!' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
