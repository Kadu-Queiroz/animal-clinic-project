import type { BasePaciente } from '@/types/shared/paciente';
import type { TutorInfoResumido } from '@/types/shared/consulta';

export interface PacienteVet extends BasePaciente {
  tutor: TutorInfoResumido;
  observacoes?: string;
}
