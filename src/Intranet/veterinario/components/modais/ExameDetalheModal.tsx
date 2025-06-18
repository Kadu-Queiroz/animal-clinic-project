import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { X } from 'lucide-react';
import { ExameVet } from '@/types/intranet/exame_intranet';

interface ExameDetalheModalProps {
  aberto: boolean;
  exame: ExameVet;
  onFechar: () => void;
}

export function ExameDetalheModal({ aberto, exame, onFechar }: ExameDetalheModalProps) {
  const dataFormatada = (() => {
    const dataRaw = exame.data_realizacao || exame.data_solicitacao;
    const data = new Date(dataRaw);
    return isNaN(data.getTime()) ? 'Data não informada' : data.toLocaleDateString('pt-BR');
  })();

  return (
    <Dialog open={aberto} onClose={onFechar} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Detalhes do Exame</DialogTitle>
            <button onClick={onFechar}>
              <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Paciente:</strong> {exame.animal.nome}
            </p>
            <p>
              <strong>Tipo:</strong> {exame.tipo}
            </p>
            <p>
              <strong>Status:</strong> {exame.status}
            </p>
            <p>
              <strong>Data:</strong> {dataFormatada}
            </p>

            {exame.arquivo && (
              <p>
                <strong>Arquivo:</strong>{' '}
                <a
                  href={exame.arquivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Download
                </a>
              </p>
            )}

            {exame.texto_ocr && (
              <div>
                <strong>Texto OCR:</strong>
                <pre className="mt-1 max-h-60 overflow-y-auto whitespace-pre-wrap rounded bg-gray-100 p-2 text-gray-800">
                  {exame.texto_ocr}
                </pre>
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
