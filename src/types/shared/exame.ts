import type { AnimalInfoResumido } from './consulta';

export interface BaseExame {
  id: number;
  tipo: string;
  status: 'pendente' | 'em_analise' | 'concluido';
  data_solicitacao: string;
  data_realizacao?: string;
  texto_ocr?: string;
  arquivo?: string;
  animal: AnimalInfoResumido;

  //Flags de leitura
  lido_tutor?: boolean;
  lido_vet?: boolean;
}
