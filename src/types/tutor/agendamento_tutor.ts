export type ISODate = string; // YYYY-MM-DD
export type ISODateTime = string; // YYYY-MM-DDTHH:mm:ss

export type AgendaSlot = {
  start_at: ISODateTime;
  end_at: ISODateTime;
};

export type FiltroAgendaSlots = {
  veterinario_id: number;
  date_from: ISODate;
  date_to: ISODate;
};

/** Fonte de verdade do wizard */
export type AgendamentoWizardState = {
  animal_id?: number;
  veterinario_id?: number;
  slot?: AgendaSlot | null;
  procedimento?: string; // default "consulta"
  observacoes?: string | null;
};

/** Payload real do backend (derivado do wizard) */
export type AgendarConsultaPayload = {
  animal_id: number;
  veterinario_id: number;
  data_hora: ISODateTime;
  duracao_min: number;
  procedimento: string;
  status?: 'agendada' | 'cancelada' | 'concluida' | string;
  observacoes?: string | null;
};
