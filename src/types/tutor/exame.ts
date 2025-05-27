export type ExameData = {
  pet: string;
  tipo: string;
  data: string;
  status: 'Disponível' | 'Em análise' | 'Aguardando coleta';
  anexo?: string;
};
