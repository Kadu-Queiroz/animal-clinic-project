import { z } from 'zod';

export const agendamentoSchema = z.object({
  pet: z.string().min(1, 'Selecione um pet.'),
  servico: z.string().min(1, 'Selecione um serviço.'),
  data: z.string().min(1, 'Escolha uma data.'),
  hora: z.string().min(1, 'Escolha um horário.'),
});

export type AgendamentoData = z.infer<typeof agendamentoSchema>;