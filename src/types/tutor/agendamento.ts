export type AgendamentoData = {
  id?: number;
  pet: string;
  servico: string;
  tipo?: string;
  data: string;
  hora: string;
};

export type RespostaIA = {
  resposta: string;
  acao_executada?: string;
  sucesso?: boolean;
  dados?: AgendamentoData | null;
};
