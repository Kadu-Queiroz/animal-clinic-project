import api from '@/lib/api';
import { getAuthHeaders } from '@/lib/auth-headers';
import type { TutorAuthData, TutorDashboardData, ExameData, ConsultaData } from '@/types/tutor';

// Login do tutor via CPF e senha (mantém rota de auth)
async function loginTutor(
  cpf: string,
  senha: string,
): Promise<{ access_token: string; user: TutorAuthData }> {
  const response = await api.post('/auth/login', {
    cpf,
    senha,
  });
  return response.data;
}

// Alteração de senha autenticada com token JWT (mantém rota de auth)
async function alterarSenha(novaSenha: string, token: string): Promise<{ message: string }> {
  const response = await api.post('/auth/alterar-senha', { novaSenha }, getAuthHeaders(token));
  return response.data;
}

// Busca os dados completos do tutor para o dashboard
async function buscarDadosDoTutor(cpf: string, token: string): Promise<TutorDashboardData> {
  const response = await api.get('/cliente/dashboard', {
    params: { cpf },
    ...getAuthHeaders(token),
  });
  return response.data;
}

// Lista os exames associados ao tutor
async function buscarExamesDetalhados(cpf: string, token: string): Promise<ExameData[]> {
  const response = await api.get('/cliente/exames', {
    params: { cpf },
    ...getAuthHeaders(token),
  });
  return response.data;
}

// Lista as consultas futuras ou históricas do tutor
async function buscarConsultasDoTutor(cpf: string, token: string): Promise<ConsultaData[]> {
  const response = await api.get('/cliente/consultas', {
    params: { cpf },
    ...getAuthHeaders(token),
  });
  return response.data;
}

export {
  loginTutor,
  alterarSenha,
  buscarDadosDoTutor,
  buscarExamesDetalhados,
  buscarConsultasDoTutor,
};
