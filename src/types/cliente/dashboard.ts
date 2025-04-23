export type PetData = {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  cor: string;
  sexo: string;
  pelagem: string;
  chip: string;
  data_nascimento: string;
  foto?: string;
};

export type ConsultaData = {
  id: number;
  data_hora: string;
  tipo: string;
  status: string;
  veterinario_nome: string;
};

export type LembreteData = {
  id: number;
  texto: string;
};

export type ExameData = {
  pet: string;
  tipo: string;
  data: string;
  status: 'Disponível' | 'Em análise' | 'Aguardando coleta';
  anexo?: string;
};

export type ClienteData = {
  nome: string;
  telefone: string;
  cpf: string;
  cep: string;
  numero_residencia: string;
  pets: PetData[];
  consultas: ConsultaData[];
  lembretes: LembreteData[];
  exames_pendentes: number;
  exames: ExameData[];
};

export type AgendamentoData = {
  id?: number;
  pet: string;
  servico: string;
  tipo?: string;
  data: string;
  hora: string;
};

export type EventoHistorico = {
  data: string;
  tipo: 'consulta' | 'vacina';
  descricao: string;
  anexo?: string;
};

export type RespostaIA = {
  resposta: string;
  acao_executada?: string;
  sucesso?: boolean;
  dados?: AgendamentoData | null;
};

