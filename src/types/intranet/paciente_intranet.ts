import type { TutorInfoResumido } from '@/types/shared/consulta';

export interface PacienteVet {
  id: number;
  nome: string;
  especie: string;
  raca?: string;
  sexo?: string;
  idade_aproximada?: string;
  tutor: TutorInfoResumido;
}
