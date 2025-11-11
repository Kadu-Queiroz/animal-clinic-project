import api from '@/lib/api';
import { getAuthHeaders } from '@/lib/auth-headers';
import type {
  TutorDashboardData,
  ExameData,
  ConsultaResumoTutor,
  LembreteData,
} from '@/types/tutor';

const withAuth = (token: string) => getAuthHeaders(token);

/* ========= Horários disponíveis ========= */

export interface HorarioDisponivelDTO {
  id: number;
  data: string; // YYYY-MM-DD
  hora: string; // HH:MM:SS
  ocupado: boolean;
  funcionario_id: number | null;
}

export interface FiltroHorariosDisponiveis {
  dias?: number;
  data?: string; // YYYY-MM-DD
  funcionario_id?: number;
  limite?: number;
}

export async function buscarHorariosDisponiveis(
  token: string,
  filtros: FiltroHorariosDisponiveis = {},
): Promise<HorarioDisponivelDTO[]> {
  const { data } = await api.get<HorarioDisponivelDTO[]>('/cliente/horarios/disponiveis', {
    ...withAuth(token),
    params: {
      dias: filtros.dias ?? 30,
      limite: filtros.limite ?? 500,
      data: filtros.data,
      funcionario_id: filtros.funcionario_id,
    },
  });
  return data;
}

/* ========= Consultas (tutor) ========= */

export interface AgendarConsultaTutorData {
  animal_id: number;
  data: string; // YYYY-MM-DD
  hora: string; // HH:MM:SS
  servico: string;
}

export async function agendarConsultaTutor(
  token: string,
  dados: AgendarConsultaTutorData,
): Promise<ConsultaResumoTutor> {
  const payload = {
    animal_id: dados.animal_id,
    data_hora: `${dados.data}T${dados.hora}`,
    tipo: dados.servico,
    origem: 'tutor',
  };
  const { data } = await api.post<ConsultaResumoTutor>(
    '/cliente/consultas',
    payload,
    withAuth(token),
  );
  return data;
}

export async function buscarConsultasDoTutor(token: string): Promise<ConsultaResumoTutor[]> {
  const { data } = await api.get<ConsultaResumoTutor[]>('/cliente/consultas', withAuth(token));
  return data;
}

export async function buscarConsultasHistoricasDoTutor(
  token: string,
  params?: { de?: string; ate?: string; status?: string; limit?: number; offset?: number },
): Promise<ConsultaResumoTutor[]> {
  const { data } = await api.get<ConsultaResumoTutor[]>('/cliente/consultas', {
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
  return data;
}

/** Reagendar (rota compartilhada) */
export async function reagendarConsulta(
  consultaId: number,
  novaDataHora: string, // YYYY-MM-DDTHH:MM:SS
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

/* ========= Dashboard / Exames ========= */

export async function buscarDadosDoTutor(token: string): Promise<TutorDashboardData> {
  const { data } = await api.get<TutorDashboardData>('/cliente/dashboard', withAuth(token));
  return data;
}

export async function buscarExamesDetalhados(token: string): Promise<ExameData[]> {
  const { data } = await api.get<ExameData[]>('/cliente/exames', withAuth(token));
  return data;
}

/* ========= Lembretes (tutor) ========= */

export async function buscarLembretesDoTutor(token: string): Promise<LembreteData[]> {
  const { data } = await api.get<LembreteData[]>('/cliente/lembretes', withAuth(token));
  return data;
}
