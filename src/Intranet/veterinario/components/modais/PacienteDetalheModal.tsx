import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { X } from 'lucide-react';
import type { PacienteVet } from '@/types/intranet/paciente_intranet';

interface Props {
  aberto: boolean;
  paciente: PacienteVet;
  onFechar: () => void;
}

export function PacienteDetalheModal({ aberto, paciente, onFechar }: Props) {
  return (
    <Dialog open={aberto} onClose={onFechar} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Detalhes do Paciente</DialogTitle>
            <button onClick={onFechar}>
              <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Nome:</strong> {paciente.nome}
            </p>
            <p>
              <strong>Espécie:</strong> {paciente.especie}
            </p>
            <p>
              <strong>Raça:</strong> {paciente.raca}
            </p>
            <p>
              <strong>Idade:</strong> {paciente.idade || 'N/A'}
            </p>
            <p>
              <strong>Tutor:</strong> {paciente.tutor.nome}
            </p>
            {paciente.observacoes && (
              <p>
                <strong>Observações:</strong> {paciente.observacoes}
              </p>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
