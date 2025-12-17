export type ISODateTime = string; // "YYYY-MM-DDTHH:mm:ss"

export type ConsultaStatus = 'agendada' | 'reagendada' | 'cancelada' | 'concluida' | (string & {}); // permite extensões sem virar "any"

export type AnimalInfoResumido = {
  id: number;
  nome: string;
  especie?: string | null;
};

export type TutorInfoResumido = {
  id: number;
  nome: string;
};

export type ConsultaResumoTutor = {
  id: number;
  data_hora: ISODateTime;
  status: ConsultaStatus;

  /** procedimento é o nome “oficial” (ex: consulta, retorno, vacina) */
  procedimento?: string | null;

  /** tipo fica como compat/legado (se ainda existir no back). Preferir procedimento. */
  tipo?: string | null;

  veterinario_id?: number | null;
  veterinario_nome?: string | null;

  animal_id?: number | null;
  /** compat/legado pra UI antiga (evitar usar em fluxo novo) */
  pet?: string | null;

  animal?: AnimalInfoResumido | null;
  tutor?: TutorInfoResumido | null;

  duracao_min?: number | null;
  observacoes?: string | null;
};
