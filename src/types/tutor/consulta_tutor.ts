import type { BaseConsulta } from '@/types/shared/consulta';

// Consulta agendada ou realizada associada ao tutor
export interface ConsultaResumoTutor extends BaseConsulta {
  veterinario_nome: string;
  pet?: string;
}

// Evento histórico na linha do tempo do animal
export interface EventoHistorico {
  data: string;
  tipo: 'consulta' | 'vacina';
  descricao: string;
  anexo?: string;
}
