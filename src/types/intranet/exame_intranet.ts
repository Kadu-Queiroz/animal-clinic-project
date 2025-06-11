import type { AnimalInfoResumido } from '@/types/shared/consulta';

export interface ExameVet {
  id: number;
  tipo: string;
  status: 'pendente' | 'em_analise' | 'concluido';
  data_solicitacao: string;
  anexo?: string;
  animal: AnimalInfoResumido;
}
