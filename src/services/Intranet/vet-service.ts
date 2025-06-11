import api from '@/lib/api';
import { getAuthHeaders } from '@/lib/auth-headers';

import type { ConsultaAgendaVet, ConsultaResumoVet } from '@/types/intranet/consulta_intranet';
import type { ExameVet } from '@/types/intranet/exame_intranet';
import type { PacienteVet } from '@/types/intranet/paciente_intranet';

/**
 * Retorna as consultas do veterinário autenticado (para exibição na agenda de hoje)
 */
export async function getConsultasVet(token: string): Promise<ConsultaAgendaVet[]> {
  const response = await api.get('/intranet/veterinario/consultas', getAuthHeaders(token));
  return response.data;
}

/**
 * Retorna as consultas do veterinário em formato de resumo (para listagem geral)
 */
export async function getConsultasResumoVet(token: string): Promise<ConsultaResumoVet[]> {
  const response = await api.get('/intranet/veterinario/consultas', getAuthHeaders(token));
  const consultas: ConsultaAgendaVet[] = response.data;

  return consultas.map(
    (consulta): ConsultaResumoVet => ({
      id: consulta.id,
      data: new Date().toISOString().split('T')[0], // Ajustar se houver `data_hora`
      hora: consulta.hora_inicio,
      status: 'agendada', // Pode vir da API futuramente
      procedimento: consulta.procedimento,
      paciente: {
        nome: consulta.animal.nome,
        especie: consulta.animal.especie,
        tutor: consulta.animal.tutor.nome,
      },
    }),
  );
}

/**
 * Retorna exames pendentes ou atribuídos ao veterinário
 */
export async function getExamesVet(token: string): Promise<ExameVet[]> {
  const response = await api.get('/intranet/veterinario/exames', getAuthHeaders(token));
  return response.data;
}

/**
 * Retorna pets sob os cuidados do veterinário
 */
export async function getPacientesVet(token: string): Promise<PacienteVet[]> {
  const response = await api.get('/intranet/veterinario/pacientes', getAuthHeaders(token));
  return response.data;
}
