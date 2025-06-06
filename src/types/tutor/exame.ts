export type ExameData = {
  pet: string;
  tipo: string;
  data: string;
  status: 'disponivel' | 'analise' | 'coleta';
  anexo?: string;
};
