interface ModalConfirmarAgendamentoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  pet: string;
  servico: string;
  data: string;
  tipo: string;
}

export function ModalConfirmarAgendamento({
  isOpen,
  onClose,
  onConfirm,
  pet,
  servico,
  data,
  tipo,
}: ModalConfirmarAgendamentoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-[#05334D]">Confirmar Agendamento</h2>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Pet:</strong> {pet}
          </p>
          <p>
            <strong>Serviço:</strong> {servico}
          </p>
          <p>
            <strong>Tipo:</strong> {tipo}
          </p>
          <p>
            <strong>Data:</strong>{' '}
            {new Date(data).toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </p>
        </div>

        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-1/2 rounded bg-gray-300 px-4 py-2 text-[#05334D] transition hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="w-1/2 rounded bg-[#CC6E28] px-4 py-2 text-white transition hover:bg-[#b55f22]"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
