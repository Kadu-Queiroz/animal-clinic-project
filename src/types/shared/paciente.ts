export interface BasePaciente {
  id: number;
  nome: string;
  especie: string;
  raca?: string;
  sexo?: string;
  data_nascimento?: string;
  idade?: number;
  peso?: number;
  cor?: string;
  pelagem?: string;
  chip?: string;
  foto?: string;
}
