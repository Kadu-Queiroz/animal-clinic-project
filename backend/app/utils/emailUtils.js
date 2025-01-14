const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, body) => {
  const transporter = nodemailer.createTransport({ /* Configurações SMTP */ });
  await transporter.sendMail({ from: 'noreply@clinica.com', to, subject, html: body });
};

module.exports = { sendEmail };
