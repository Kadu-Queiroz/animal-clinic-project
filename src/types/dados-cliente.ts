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
};

export type ConsultaData = {
  id: number;
  data_hora: string;
  tipo: string;
  status: string;
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
  exames: ExameData[]; // ← novo campo
};