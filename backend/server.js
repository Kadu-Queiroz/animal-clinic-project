const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Conexão com o banco de dados
const appointmentsRoutes = require('./routes/appointments'); // Rotas de agendamento

const app = express();

// Habilitar CORS para permitir requisições do frontend
app.use(cors({
  origin: '*', // Temporariamente define para todos os domínios
  methods: ['GET', 'POST'], // Métodos permitidos
  credentials: true, // Caso queira enviar cookies ou outras credenciais
}));

// Middlewares
app.use(express.json()); // Permite o uso de JSON no body das requisições

// Log de requisição para debug
app.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  next();
});

// Usar as rotas de agendamento
app.use('/appointments', appointmentsRoutes);

// Iniciar o servidor e conectar ao banco de dados
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
