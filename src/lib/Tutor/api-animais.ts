import api from '@/lib/api';
import { getAuthHeaders } from '@/lib/auth-headers';
import type { PetData } from '@/types/tutor/pet_tutor';

/**
 * Busca a lista de animais cadastrados pelo tutor autenticado.
 *
 * @param token JWT de autenticação do tutor
 * @returns Lista de animais do tutor
 */
export async function buscarAnimaisDoTutor(token: string): Promise<PetData[]> {
  const response = await api.get('/tutor/animais', getAuthHeaders(token));
  return response.data;
}
