import api from './api';
import type { TutorData, ExameData, ConsultaData } from '@/types/tutor';

/**
 * Busca os dados completos do tutor (cliente) autenticado.
 */
export async function buscarDadosDoTutor(cpf: string): Promise<TutorData> {
  const response = await api.get('/cliente/dados', {
    params: { cpf },
  });
  return response.data;
}

/**
 * Busca os exames detalhados públicos vinculados ao CPF.
 */
export async function buscarExamesDetalhados(cpf: string): Promise<ExameData[]> {
  const response = await api.get('/exames/detalhados-publico', {
    params: { cpf },
  });
  return response.data;
}

/**
 * Lista todas as consultas associadas ao CPF do tutor.
 */
export async function buscarConsultasDoTutor(cpf: string): Promise<ConsultaData[]> {
  const response = await api.get('/cliente/consultas', {
    params: { cpf },
  });
  return response.data;
}
