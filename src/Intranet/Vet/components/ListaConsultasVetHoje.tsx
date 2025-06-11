import { CalendarClock, Dog, Clipboard, User } from 'lucide-react';
import type { ConsultaAgendaVet } from '@/types/intranet/consulta_intranet';
import { TituloSecao } from '@/Intranet/components/ui/typography/TituloSecao';

interface ListaConsultasVetHojeProps {
  consultas: ConsultaAgendaVet[];
}

export function ListaConsultasVetHoje({ consultas }: ListaConsultasVetHojeProps) {
  return (
    <div className="p-4">
      <TituloSecao>Agenda de Hoje</TituloSecao>

      {consultas.length === 0 ? (
        <p className="text-gray-500">Nenhuma consulta agendada para hoje.</p>
      ) : (
        <div className="space-y-4">
          {consultas.map(consulta => (
            <div key={consulta.id} className="rounded border border-gray-200 p-4 shadow-sm">
              <div className="mb-1 flex items-center gap-2 text-sm text-blue-600">
                <CalendarClock className="h-4 w-4" />
                <span>{consulta.hora_inicio}</span>
              </div>
              <div className="text-sm text-gray-800">
                <div className="mb-1 flex items-center gap-2">
                  <Dog className="h-4 w-4 text-pink-600" />
                  <span>
                    {consulta.animal.nome} ({consulta.animal.especie})
                  </span>
                </div>
                <div className="mb-1 flex items-center gap-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span>{consulta.animal.tutor.nome}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
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
      )}
    </div>
  );
}
