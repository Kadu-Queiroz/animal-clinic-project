import { FileText } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import type { ExameData } from '@/types/tutor/exame_tutor';

export function ExameCard({ pet, tipo, data, arquivo, status_legivel }: ExameData) {
  const STATUS_CLASSES: Record<ExameData['status_legivel'], string> = {
    disponivel: 'text-green-600',
    analise: 'text-yellow-600',
    coleta: 'text-gray-500',
  };

  const isImagem = arquivo?.match(/\.(jpe?g|png|gif|webp)$/i) != null;
  const urlCompleta = arquivo ? `http://localhost:8000/uploads/${arquivo}` : null;

  const dataFormatada = (() => {
    try {
      const d = new Date(data);
      return !isNaN(d.getTime())
        ? format(d, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
        : 'Data não informada';
    } catch {
      return 'Data não informada';
    }
  })();

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg">
      {urlCompleta && isImagem ? (
        <img
          src={urlCompleta}
          alt={`Imagem do exame ${tipo}`}
          className="h-40 w-full object-cover"
        />
      ) : (
        <div className="flex h-40 w-full items-center justify-center bg-gray-100">
          <FileText size={48} className="text-[#8B947F]" />
        </div>
      )}

      <div className="p-6">
        <h2 className="mb-2 text-lg font-semibold text-[#05334D]">{tipo}</h2>
        <p className="mb-1 text-sm text-gray-500">{pet}</p>
        <p className="mb-1 text-sm text-gray-600">Realizado em {dataFormatada}</p>
        <p className={`mb-6 text-sm font-medium ${STATUS_CLASSES[status_legivel]}`}>
          {status_legivel === 'disponivel'
            ? 'Disponível'
            : status_legivel === 'analise'
              ? 'Em análise'
              : 'Aguardando coleta'}
        </p>

        <div className="flex justify-center">
          <a
            href={urlCompleta || '#'}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!urlCompleta}
            className={`w-full rounded px-4 py-2 text-center text-white transition ${
              urlCompleta
                ? 'bg-[#05334D] hover:bg-[#042736]'
                : 'pointer-events-none bg-gray-400 opacity-50'
            }`}
            title={!urlCompleta ? 'Exame ainda não disponível' : 'Visualizar exame'}
          >
            Visualizar
          </a>
        </div>
      </div>
    </div>
  );
}
