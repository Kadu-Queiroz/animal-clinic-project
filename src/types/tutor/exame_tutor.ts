import type { BaseExame } from '@/types/shared/exame';

export type ExameData = Pick<BaseExame, 'tipo' | 'arquivo' | 'lido_tutor'> & {
  pet: string;
  data: string;
  status: 'disponivel' | 'analise' | 'coleta'; //(frontend-only)
};
