import { CalendarClock, Dog, User, Clipboard } from 'lucide-react';
import type { ConsultaAgendaVet } from '@/types/intranet/consulta_intranet';

interface ListaConsultasAgendaVetProps {
  consultas: ConsultaAgendaVet[];
}

export function ListaConsultasAgendaVet({ consultas }: ListaConsultasAgendaVetProps) {
  if (consultas.length === 0) {
    return (
      <div className="rounded-lg bg-white p-4 shadow">
        <h2 className="mb-2 text-lg font-semibold text-gray-700">Agenda de Hoje</h2>
        <p className="text-gray-500">Nenhuma consulta agendada para hoje.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">Agenda de Hoje</h2>

      <div className="space-y-4">
        {consultas.map(consulta => (
          <div key={consulta.id} className="rounded border border-gray-200 p-3 hover:bg-gray-50">
            <div className="mb-1 flex items-center gap-2 text-sm text-blue-600">
              <CalendarClock className="h-4 w-4" />
              <span>{consulta.hora_inicio}</span>
            </div>

            <div className="text-sm text-gray-700">
              <div className="mb-1 flex items-center gap-2">
                <Dog className="h-4 w-4 text-pink-600" />
                <span className="font-medium">
                  {consulta.animal.nome} ({consulta.animal.especie})
                </span>
              </div>

              <div className="mb-1 flex items-center gap-2 text-gray-600">
                <User className="h-4 w-4" />
                <span>{consulta.animal.tutor.nome}</span>
              </div>

              <div className="mb-1 flex items-center gap-2 text-gray-600">
                <Clipboard className="h-4 w-4" />
                <span>{consulta.procedimento}</span>
              </div>

              {consulta.observacoes && (
                <div className="mt-1 rounded bg-gray-100 p-2 text-xs text-gray-600">
                  {consulta.observacoes}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
