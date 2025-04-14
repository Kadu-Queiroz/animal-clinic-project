export type EventoHistorico = {
    data: string;
    tipo: 'consulta' | 'vacina';
    descricao: string;
    anexo?: string;
  };  