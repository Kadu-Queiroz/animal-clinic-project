// Consulta agendada ou realizada associada ao tutor
export type ConsultaData = {
  id: number;
  data_hora: string;
  tipo?: string;
  status: string;
  veterinario_nome: string;
  pet?: string;
};

// Evento histórico na linha do tempo do animal
export type EventoHistorico = {
  data: string;
  tipo: 'consulta' | 'vacina';
  descricao: string;
  anexo?: string;
};
