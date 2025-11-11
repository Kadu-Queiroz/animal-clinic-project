export interface LembreteData {
  id: number;
  animal_id: number;
  texto: string;
  visivel_tutor: boolean;
  ativo: boolean;
  criado_em?: string; // ISO
  atualizado_em?: string; // ISO
  criado_por_usuario_id?: number | null;
}
