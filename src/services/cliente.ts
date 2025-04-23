import axios from 'axios';
import { API_URL } from '@/config/api';
import type {
  ClienteData,
  ExameData,
  ConsultaData,
} from '@/types/cliente';

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

export async function buscarConsultasDoCliente(cpf: string): Promise<ConsultaData[]> {
  const response = await axios.get(`${API_URL}/cliente/consultas`, {
    params: { cpf },
  });
  return response.data;
}