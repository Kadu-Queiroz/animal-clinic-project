// @deprecated: a UI do tutor consome Consulta direta.
// Mantido para compat com fluxos de IA/legado que ainda falam "agendamento".

// Dados de um agendamento criado pelo tutor
export type AgendamentoData = {
  id?: number;
  pet: string;
  servico: string;
  tipo?: string;
  data: string;
  hora: string;
};

// Resposta padrão das interações da IA com o agendamento
export type RespostaIA = {
  resposta: string;
  acao_executada?: string;
  sucesso?: boolean;
  dados?: AgendamentoData | null;
};
