import type { ConsultaResumoTutor } from '@/types/tutor/consulta_tutor';

export function mapConsultasParaEventos(consultas: ConsultaResumoTutor[]) {
  return consultas.map(consulta => {
    const inicio = new Date(consulta.data_hora);

    return {
      id: consulta.id.toString(),
      title: `${consulta.pet ?? 'Pet desconhecido'} – ${consulta.veterinario_nome}`,
      start: inicio.toISOString(),
      end: new Date(inicio.getTime() + 30 * 60000).toISOString(), // 30 minutos
      extendedProps: {
        status: consulta.status,
        pet: consulta.pet,
        veterinario: consulta.veterinario_nome,
      },
    };
  });
}
