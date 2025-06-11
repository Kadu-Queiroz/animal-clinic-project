import api from '@/lib/api';
import { getAuthHeaders } from '@/lib/auth-headers';
import type { TutorDashboardData, ExameData, ConsultaResumoTutor } from '@/types/tutor';

async function buscarDadosDoTutor(cpf: string, token: string): Promise<TutorDashboardData> {
  const response = await api.get('/cliente/dashboard', {
    params: { cpf },
    ...getAuthHeaders(token),
  });
  return response.data;
}

async function buscarExamesDetalhados(cpf: string, token: string): Promise<ExameData[]> {
  const response = await api.get('/cliente/exames', {
    params: { cpf },
    ...getAuthHeaders(token),
  });
  return response.data;
}

async function buscarConsultasDoTutor(cpf: string, token: string): Promise<ConsultaResumoTutor[]> {
  const response = await api.get('/cliente/consultas', {
    params: { cpf },
    ...getAuthHeaders(token),
  });
  return response.data;
}

export { buscarDadosDoTutor, buscarExamesDetalhados, buscarConsultasDoTutor };
