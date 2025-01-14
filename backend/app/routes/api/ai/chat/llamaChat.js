const express = require('express');
const router = express.Router();
const { generate_response } = require('llama-backend\app\llama_integration\model_loader.py'); // Função que já existe no projeto

// Rota para receber prompts e responder usando o modelo Llama
router.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'O prompt é obrigatório.' });
  }

  try {
    const response = await generate_response(prompt); // Função do Llama
    res.json({ response });
  } catch (error) {
    console.error('Erro ao gerar resposta:', error);
    res.status(500).json({ error: 'Erro ao processar a solicitação.' });
  }
});

module.exports = router;
