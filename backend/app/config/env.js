require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'sua_chave_secreta_aqui',
};