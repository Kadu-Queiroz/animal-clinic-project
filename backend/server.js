const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Conexão com o banco de dados
const appointmentsRoutes = require('./routes/appointments'); // Rotas de agendamento
const availabilityRoutes = require('./routes/availability'); // Nova rota de disponibilidade

const app = express();

// Habilitar CORS para permitir requisições do frontend
app.use(cors({
  origin: 'http://localhost:3000', // Define o endereço do frontend React
  methods: ['GET', 'POST'], // Métodos permitidos
  credentials: true, // Caso queira enviar cookies ou outras credenciais
}));

// Middlewares
app.use(express.json()); // Permite o uso de JSON no body das requisições

// Usar as rotas de agendamento
app.use('/appointments', appointmentsRoutes);

// Usar a nova rota de disponibilidade de horários
app.use('/availability', availabilityRoutes);

// Iniciar o servidor e conectar ao banco de dados
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
