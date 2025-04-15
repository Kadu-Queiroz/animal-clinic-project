import axios from 'axios';
import { API_URL } from '@config/api';
import type { ClienteData, PetData, ExameData } from '@/types/dados-cliente';
import type { Exame } from '@/types/dados-exames';
import type { AgendamentoData } from '@/types/dados-agendamento';

/**
 * Tipagem da resposta do backend para o endpoint /tutores/{cpf}
 */
type TutorAPIResponse = {
  nome: string;
  telefone: string;
  cpf: string;
  cep: string;
  numero_residencia: string;
  animais: PetData[];
};

/**
 * Busca os dados completos do cliente (incluindo exames detalhados).
 */
export async function buscarDadosDoCliente(cpf: string): Promise<ClienteData> {
  try {
    const [tutorResponse, exames] = await Promise.all([
      axios.get<TutorAPIResponse>(`${API_URL}/tutores/${cpf}`),
      buscarExamesDetalhadosPorCpf(cpf),
    ]);

    const data = tutorResponse.data;

    return {
      nome: data.nome,
      telefone: data.telefone,
      cpf: data.cpf,
      cep: data.cep,
      numero_residencia: data.numero_residencia,
      pets: data.animais.map((a) => ({
        id: a.id,
        nome: a.nome,
        especie: a.especie,
        raca: a.raca,
        cor: a.cor,
        sexo: a.sexo,
        pelagem: a.pelagem,
        chip: a.chip,
        data_nascimento: a.data_nascimento,
      })),
      consultas: [], // ← A ser alimentado futuramente
      lembretes: [], // ← A ser alimentado futuramente
      exames_pendentes: exames.filter(e => e.status !== 'Disponível').length,
      exames,
    };
  } catch (error) {
    console.error('[buscarDadosDoCliente] Erro ao buscar dados do tutor:', error);
    throw error;
  }
}

/**
 * Busca os exames básicos vinculados ao CPF do tutor.
 */
export async function buscarExamesPorCpf(cpf: string): Promise<Exame[]> {
  const response = await axios.get(`${API_URL}/cliente/exames`, {
    params: { cpf },
  });
  return response.data;
}

/**
 * Busca os exames detalhados (com nome do pet, status, etc.).
 */
export async function buscarExamesDetalhadosPorCpf(cpf: string): Promise<ExameData[]> {
  const response = await axios.get(`${API_URL}/exames/detalhados-publico`, {
    params: { cpf },
  });
  return response.data;
}

/**
 * Envia um novo agendamento para o backend.
 */
export async function enviarAgendamento(data: AgendamentoData): Promise<{ sucesso: boolean }> {
  const response = await axios.post(`${API_URL}/cliente/agendar`, data);
  return response.data;
}