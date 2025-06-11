export interface BaseConsulta {
  id: number;
  data_hora: string;
  tipo?: string;
  status: string;
}

export interface AnimalInfoResumido {
  nome: string;
  especie: string;
}

export interface TutorInfoResumido {
  nome: string;
}
