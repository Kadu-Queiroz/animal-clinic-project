// Consulta agendada ou realizada associada ao tutor
export type ConsultaResumoTutor = {
  id: number;
  data_hora: string;
  tipo?: string;
  status: string;
  veterinario_nome: string;
  pet?: string;
  animal_id?: string | number;
  veterinario_id?: string | number;
};
