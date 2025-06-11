import type { AnimalInfoResumido, TutorInfoResumido } from '@/types/shared/consulta';

// Consulta para exibição na agenda de hoje do veterinário
export interface ConsultaAgendaVet {
  id: number;
  hora_inicio: string; // formato HH:mm
  procedimento: string;
  observacoes?: string;
  animal: AnimalInfoResumido & {
    tutor: TutorInfoResumido;
  };
}

// Consulta para listagem geral no painel do veterinário
export interface ConsultaResumoVet {
  id: number;
  data: string; // formato ISO ou yyyy-MM-dd
  hora: string; // formato HH:mm
  status: string;
  procedimento: string;
  paciente: {
    nome: string;
    especie: string;
    tutor: string;
  };
}
