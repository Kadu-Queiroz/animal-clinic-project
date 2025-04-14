import axios from 'axios';
import { API_URL } from '@config/api';
import type { AgendamentoData } from '../types/dados-agendamento';
import type { ClienteData } from '../types/dados-cliente';
import type { Exame } from '../types/dados-exames';

/**
 * Busca os dados do cliente pelo CPF.
 */
export async function buscarDadosDoCliente(cpf: string): Promise<ClienteData> {
  try {
    const response = await axios.get(`${API_URL}/cliente/dados`, {
      params: { cpf },
    });

    const data = response.data;

    return {
      nome: data.nome,
      nextAppointments: [],         // Você pode popular futuramente com /cliente/consultas
      pendingExams: 0,              // Pode ser alimentado com dados de exames
      reminders: [],                // Para lembretes futuros
      pets: data.animais.map((a: { id: number; nome: string; especie: string; raca: string; sexo: string; cor: string; pelagem: string; chip: string; data_nascimento: string }) => ({
        id: a.id,
        nome: a.nome,
        especie: a.especie,
        raca: a.raca,
        sexo: a.sexo,
        cor: a.cor,
        pelagem: a.pelagem,
        chip: a.chip,
        data_nascimento: a.data_nascimento,
      })),
    };
  } catch (err) {
    console.warn('[buscarDadosDoCliente] Erro na API, usando mock temporário.', err);

    // 🔁 Retorno alternativo (mock)
    return {
      nome: 'Maria Silva',
      nextAppointments: [
        {
          id: 1,
          data: '2025-04-20T10:00:00',
          tipo: 'Consulta',
          status: 'Confirmada',
        },
      ],
      pendingExams: 2,
      reminders: [
        { id: 1, texto: 'Revisar vacina do Rex em breve' },
        { id: 2, texto: 'Verificar retorno da última consulta' },
      ],
      pets: [
        {
          id: 1,
          nome: 'Rex',
          especie: 'Cachorro',
          raca: 'Labrador',
          sexo: 'Macho',
          cor: 'Preto',
          pelagem: 'Curta',
          chip: '987654321',
          data_nascimento: '2020-06-15',
        },
      ],
    };
  }
}

/**
 * Busca os exames vinculados ao CPF do tutor.
 */
export async function buscarExamesPorCpf(cpf: string): Promise<Exame[]> {
  const response = await axios.get(`${API_URL}/cliente/exames`, {
    params: { cpf },
  });
  return response.data;
}

/**
 * Envia um novo agendamento para o backend.
 */
export async function enviarAgendamento(data: AgendamentoData): Promise<{ success: boolean }> {
  const response = await axios.post(`${API_URL}/cliente/agendar`, data);
  return response.data;
}