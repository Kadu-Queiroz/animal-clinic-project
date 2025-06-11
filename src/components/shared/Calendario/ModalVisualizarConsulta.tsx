import { Dialog } from '@headlessui/react';
import { CalendarioConsultas } from './CalendarioConsultas';
import type { EventInput } from '@fullcalendar/core';
import type { ConsultaResumoTutor } from '@/types/tutor';

interface ModalVisualizarConsultaProps {
  aberto: boolean;
  aoFechar: () => void;
  titulo?: string;
  eventos?: EventInput[]; // reservado para futuro uso com FullCalendar
  cpf?: string;
  token?: string;
  onSelecionarConsulta?: (consulta: ConsultaResumoTutor) => void;
}

export function ModalVisualizarConsulta({
  aberto,
  aoFechar,
  titulo = 'Consultas Agendadas',
  eventos = [],
  cpf,
  token,
  onSelecionarConsulta,
}: ModalVisualizarConsultaProps) {
  return (
    <Dialog
      open={aberto}
      onClose={aoFechar}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
      <div className="z-50 w-full max-w-4xl rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
        <Dialog.Title className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          {titulo}
        </Dialog.Title>
        <CalendarioConsultas
          eventos={eventos}
          cpf={cpf}
          token={token}
          onSelecionarConsulta={onSelecionarConsulta}
        />
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
