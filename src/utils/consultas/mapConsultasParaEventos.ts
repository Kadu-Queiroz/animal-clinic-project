import { ConsultaFutura } from "@/hooks/useConsultasFuturas";

export function mapConsultasParaEventos(consultas: ConsultaFutura[]) {
  return consultas.map((consulta) => {
    const inicio = new Date(consulta.data_hora);

    return {
      id: consulta.id.toString(),
      title: `${consulta.pet} – ${consulta.veterinario_nome}`,
      start: inicio.toISOString(),
      end: new Date(inicio.getTime() + 30 * 60000).toISOString(), // duração padrão de 30 min
      extendedProps: {
        status: consulta.status,
        pet: consulta.pet,
        veterinario: consulta.veterinario_nome,
      },
    };
  });
}