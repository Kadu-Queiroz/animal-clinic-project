import { Dialog } from '@headlessui/react';
import { CalendarioConsultas } from '@components/Cliente/Calendario/CalendarioConsultas';
import { EventInput } from '@fullcalendar/core';

interface IAModalCalendarioProps {
  aberto: boolean;
  aoFechar: () => void;
  eventos: EventInput[];
}

export function IAModalCalendario({ aberto, aoFechar, eventos }: IAModalCalendarioProps) {
  return (
    <Dialog
      open={aberto}
      onClose={aoFechar}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
      <div className="z-50 w-full max-w-4xl rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
        <Dialog.Title className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          Consulta Confirmada ✅
        </Dialog.Title>
        <CalendarioConsultas eventos={eventos} />
        <div className="mt-4 text-right">
          <button
            onClick={aoFechar}
            className="rounded-md bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </Dialog>
  );
}
