import api from '@/lib/api';
import { getAuthHeaders } from '@/lib/auth-headers';
import type {
  TutorDashboardData,
  ExameData,
  ConsultaResumoTutor,
  LembreteData,
} from '@/types/tutor';

const withAuth = (token: string) => getAuthHeaders(token);

/* ============================================================
 * AGENDA (NOVO SISTEMA - slots calculados)
 * ============================================================ */

export interface AgendaSlotDTO {
  start_at: string; // ISO datetime (YYYY-MM-DDTHH:mm:ss)
  end_at: string; // ISO datetime (YYYY-MM-DDTHH:mm:ss)
}

export interface FiltroAgendaSlots {
  veterinario_id: number;
  date_from: string; // YYYY-MM-DD
  date_to: string; // YYYY-MM-DD
}

export async function buscarSlotsDisponiveis(filtros: FiltroAgendaSlots): Promise<AgendaSlotDTO[]> {
  const { data } = await api.get<AgendaSlotDTO[]>('/public/agenda/slots', {
    params: {
      veterinario_id: filtros.veterinario_id,
      date_from: filtros.date_from,
      date_to: filtros.date_to,
    },
  });
  return data ?? [];
}

/** Helper: duração em minutos (end-start) com fallback seguro */
export function calcularDuracaoMin(startIso: string, endIso: string): number {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  const mins = Math.round((end - start) / 60000);

  // blindagem: evita NaN/negativo/0 virar 422 no back
  if (!Number.isFinite(mins) || mins <= 0) return 30;
  return mins;
}

/** Helper para listar consultas ativas */
export function isConsultaAtiva(status?: string | null): boolean {
  const st = (status || '').toLowerCase();
  return st === 'agendada' || st === 'reagendada';
}

export function isConsultaFutura(dataHora?: string | null): boolean {
  if (!dataHora) return false;
  const t = new Date(dataHora).getTime();
  return Number.isFinite(t) && t >= Date.now();
}

/** Lista consultas futuras + ativas (client-side filter). */
export async function buscarConsultasAtivasDoTutor(token: string): Promise<ConsultaResumoTutor[]> {
  const lista = await buscarConsultasDoTutor(token);
  return (lista ?? []).filter(c => isConsultaAtiva(c.status) && isConsultaFutura(c.data_hora));
}

/* ============================================================
 * AGENDAMENTO (NOVO - rota compartilhada /agendamento/)
 * ============================================================ */

export interface AgendarConsultaTutorData {
  animal_id: number;
  veterinario_id: number;
  start_at: string; // ISO datetime (slot.start_at)
  end_at?: string; // ISO datetime (slot.end_at)
  procedimento?: string; // default "consulta"
  observacoes?: string | null;
}

/**
 * Agenda uma consulta usando o novo motor.
 * Requer token (tutor logado).
 */
export async function agendarConsultaTutor(
  token: string,
  dados: AgendarConsultaTutorData,
): Promise<ConsultaResumoTutor> {
  const duracao_min = dados.end_at ? calcularDuracaoMin(dados.start_at, dados.end_at) : 30;

  const payload = {
    animal_id: dados.animal_id,
    veterinario_id: dados.veterinario_id,
    data_hora: dados.start_at,
    duracao_min,
    procedimento: (dados.procedimento ?? 'consulta').trim(),
    status: 'agendada',
    observacoes: dados.observacoes ?? null,
  };

  // debug útil (some em prod)
  if (import.meta.env.DEV) {
    console.log('[POST /agendamento/] payload:', payload);
  }

  const { data } = await api.post<ConsultaResumoTutor>('/agendamento/', payload, withAuth(token));
  return data;
}

/* ============================================================
 * CONSULTAS (tutor)
 * ============================================================ */

export async function buscarConsultasDoTutor(token: string): Promise<ConsultaResumoTutor[]> {
  const { data } = await api.get<ConsultaResumoTutor[]>('/tutor/consultas', withAuth(token));
  return data ?? [];
}

export async function buscarConsultasHistoricasDoTutor(
  token: string,
  params?: { de?: string; ate?: string; status?: string; limit?: number; offset?: number },
): Promise<ConsultaResumoTutor[]> {
  const { data } = await api.get<ConsultaResumoTutor[]>('/tutor/consultas', {
    ...withAuth(token),
    params: {
      escopo: 'passadas',
      de: params?.de,
      ate: params?.ate,
      status: params?.status,
      limit: params?.limit ?? 50,
      offset: params?.offset ?? 0,
    },
  });
  return data ?? [];
}

/** Reagendar (rota compartilhada) */
export async function reagendarConsulta(
  consultaId: number,
  novaDataHora: string, // YYYY-MM-DDTHH:mm:ss
  observacoes: string | null,
  token: string,
): Promise<ConsultaResumoTutor> {
  const { data } = await api.put<ConsultaResumoTutor>(
    `/consultas/${consultaId}`,
    { data_hora: novaDataHora, observacoes },
    withAuth(token),
  );
  return data;
}

/** Cancelar consulta (rota compartilhada ?) */
export async function cancelarConsulta(token: string, consultaId: number): Promise<void> {
  await api.delete(`/agendamento/${consultaId}`, withAuth(token));
}

/* ============================================================
 * DASHBOARD / EXAMES
 * ============================================================ */

export async function buscarDadosDoTutor(token: string): Promise<TutorDashboardData> {
  const { data } = await api.get<TutorDashboardData>('/tutor/dashboard', withAuth(token));
  return data;
}

export async function buscarExamesDetalhados(token: string): Promise<ExameData[]> {
  const { data } = await api.get<ExameData[]>('/tutor/exames', withAuth(token));
  return data ?? [];
}

/* ============================================================
 * LEMBRETES (tutor)
 * ============================================================ */

export async function buscarLembretesDoTutor(token: string): Promise<LembreteData[]> {
  const { data } = await api.get<LembreteData[]>('/tutor/lembretes', withAuth(token));
  return data ?? [];
}
