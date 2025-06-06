import { PetData } from './pet';
import { ConsultaData } from './consulta';
import { LembreteData } from './lembrete';
import { ExameData } from './exame';

// Dados consolidados do tutor para exibição no dashboard
export type TutorDashboardData = {
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
