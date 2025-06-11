import { PetData } from './pet_tutor';
import { ConsultaResumoTutor } from './consulta_tutor';
import { LembreteData } from './lembrete_tutor';
import { ExameData } from './exame_tutor';

// Dados consolidados do tutor para exibição no dashboard
export type TutorDashboardData = {
  nome: string;
  telefone: string;
  cpf: string;
  cep: string;
  numero_residencia: string;
  pets: PetData[];
  consultas: ConsultaResumoTutor[];
  lembretes: LembreteData[];
  exames_pendentes: number;
  exames: ExameData[];
};
