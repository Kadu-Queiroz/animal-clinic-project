import { z } from 'zod';

export const agendamentoSchema = z.object({
  pet: z.string().min(1, 'Selecione um pet'),
  servico: z.string().min(1, 'Escolha um serviço'),

  // Mantemos "data" só pra UX (calendário / validação de etapa)
  data: z.string().min(1, 'Escolha uma data'),

  // NOVO: slot real do mini-calendar
  slot_start_at: z.string().min(1, 'Escolha um horário'),
  slot_end_at: z.string().min(1, 'Escolha um horário'),
});

export type AgendamentoData = z.infer<typeof agendamentoSchema>;
