import axios from 'axios';
import { API_URL } from '@config/api';
import type { ClienteData } from '@/types/dados-cliente';

export async function buscarDadosDoCliente(cpf: string): Promise<ClienteData> {
  const { data } = await axios.get<ClienteData>(`${API_URL}/cliente/dados?cpf=${cpf}`);
  return data;
}
