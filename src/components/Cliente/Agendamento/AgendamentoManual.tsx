import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { EventInput } from '@fullcalendar/core';
import { useState } from 'react';

interface AgendamentoManualProps {
  eventos?: EventInput[];
  onSelecionar: (data: string) => void;
}

export function AgendamentoManual({ eventos = [], onSelecionar }: AgendamentoManualProps) {
  const [mensagem, setMensagem] = useState(
    'Selecione um dia disponível para agendar sua consulta.',
  );

  const handleDateClick = (arg: { dateStr: string }) => {
    const dataSelecionada = arg.dateStr;
    setMensagem(`Você selecionou o dia ${new Date(dataSelecionada).toLocaleDateString('pt-BR')}`);
    onSelecionar(dataSelecionada);
  };

  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-md dark:bg-zinc-900">
      <h2 className="mb-4 text-xl font-semibold text-[#05334D] dark:text-white">
        Agendamento Manual de Consulta 📅
      </h2>

      <div className="mb-3 text-sm text-[#05334D] dark:text-gray-200">{mensagem}</div>

      <div className="overflow-hidden rounded border border-[#8B947F] shadow dark:border-zinc-700">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={ptBrLocale}
          selectable={true}
          dateClick={handleDateClick}
          events={eventos}
          height="auto"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
          dayMaxEvents={1}
          eventDisplay="block"
          eventColor="#CC6E28"
          titleFormat={{ year: 'numeric', month: 'long' }}
        />
      </div>
    </div>
  );
}
