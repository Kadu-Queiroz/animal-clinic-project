import api from '@/lib/api';
import { getAuthHeaders } from '@/lib/auth-headers';
import type { UsuarioAutenticado } from '@/types/common/user';

interface LoginResponse {
  access_token: string;
  user: UsuarioAutenticado;
}

// Login unificado
export async function login(cpf: string, senha: string): Promise<LoginResponse> {
  const response = await api.post('/auth/login', { cpf, senha });
  return response.data;
}

// Alteração de senha autenticada
export async function alterarSenha(novaSenha: string, token: string): Promise<{ message: string }> {
  const response = await api.post('/auth/alterar-senha', { novaSenha }, getAuthHeaders(token));
  return response.data;
}
