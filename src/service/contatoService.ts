// src/services/contatoService.ts
import emailFormApi from "./../pages/api/emailFormApi";

export interface EmailData {
  nome: string;
  email: string;
  mensagem: string;
}

const contatoService = {
  async enviarEmail(dados: EmailData) {
    try {
      const response = await emailFormApi.post("/enviar-email", dados);
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      throw new Error("Falha no envio do e-mail. Tente novamente mais tarde.");
    }
  },
};

export default contatoService;