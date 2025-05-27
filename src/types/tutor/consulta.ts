export type ConsultaData = {
  id: number;
  data_hora: string;
  tipo: string;
  status: string;
  veterinario_nome: string;
};

export type EventoHistorico = {
  data: string;
  tipo: 'consulta' | 'vacina';
  descricao: string;
  anexo?: string;
};
