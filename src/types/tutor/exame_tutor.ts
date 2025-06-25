export type ExameData = {
  id: number;
  tipo: string;
  status: 'pendente' | 'em_analise' | 'concluido'; // raw do backend
  data_solicitacao: string;
  data_realizacao?: string;
  texto_ocr?: string;
  arquivo?: string;

  // Flags
  lido_tutor?: boolean;

  // Campos específicos da UI

  pet: string;
  data: string; // derivado de data_realizacao || data_solicitacao
  status_legivel: 'disponivel' | 'analise' | 'coleta'; // frontend-only
};
