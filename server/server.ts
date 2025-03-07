import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

// Carregar as variáveis de ambiente corretamente
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Permitir requisições do frontend

// Verificação das variáveis de ambiente
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ ERRO: As variáveis de ambiente EMAIL_USER e EMAIL_PASS não estão definidas.");
  process.exit(1); // Encerra o processo se as variáveis não estiverem definidas
}

// Configuração do transporter do Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Rota para envio de e-mail
app.post("/enviar-email", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    await transporter.sendMail({
      from: `"Contato do Site" <${process.env.EMAIL_USER}>`,
      to: "contato@tokadospets.com.br",
      subject: "Novo Contato do Site",
      text: `Nome: ${nome}\nE-mail: ${email}\nMensagem: ${mensagem}`,
    });

    res.json({ success: true, message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    res.status(500).json({ success: false, message: "Erro ao enviar e-mail." });
  }
});

// Configuração da porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));