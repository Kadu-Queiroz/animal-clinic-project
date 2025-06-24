// Base de dados original de exame do tutor (refatorada)
export type BaseExame = {
  id: number;
  tipo: string;
  status: 'pendente' | 'em_analise' | 'concluido';
  data_solicitacao: string;
  data_realizacao?: string;
  texto_ocr?: string;
  arquivo?: string;

  // Flags de leitura
  lido_tutor?: boolean;
  lido_vet?: boolean;

  // Animal foi removido porque só era usado na intranet
};

// Exame com campos adaptados à UI do tutor
export type ExameData = Pick<BaseExame, 'tipo' | 'arquivo' | 'lido_tutor'> & {
  pet: string;
  data: string;
  status: 'disponivel' | 'analise' | 'coleta'; // frontend-only
};
