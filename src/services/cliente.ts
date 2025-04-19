import axios from 'axios';
import { API_URL } from '@/config/api';
import type { ClienteData, ExameData } from '@/types/dados-cliente';

export async function buscarDadosDoCliente(cpf: string): Promise<ClienteData> {
  const response = await axios.get(`${API_URL}/cliente/dados`, {
    params: { cpf },
  });
  return response.data;
}

export async function buscarExamesDetalhadosPorCpf(cpf: string): Promise<ExameData[]> {
  const response = await axios.get(`${API_URL}/exames/detalhados-publico`, {
    params: { cpf },
  });
  return response.data;
}