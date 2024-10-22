const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '!K@du3836', // Altere conforme necessário
  database: 'clinicDB'
});

// Conectar ao banco de dados
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    process.exit(1); // Finalizar a aplicação se a conexão falhar
  } else {
    console.log('Conectado ao MySQL!');
  }
});

// Exportar a conexão para ser usada em outros arquivos
module.exports = db;
