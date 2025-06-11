import { FileText } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

interface ExameCardProps {
  pet?: string;
  tipo?: string;
  data?: string;
  status?: 'disponivel' | 'analise' | 'coleta';
  anexo?: string;
}

export function ExameCard({
  pet = 'Pet não identificado',
  tipo = 'Exame',
  data = '',
  status = 'analise',
  anexo,
}: ExameCardProps) {
  const statusClasses: Record<NonNullable<ExameCardProps['status']>, string> = {
    disponivel: 'text-green-600',
    analise: 'text-yellow-600',
    coleta: 'text-gray-500',
  };

  const statusLabels: Record<NonNullable<ExameCardProps['status']>, string> = {
    disponivel: 'Disponível',
    analise: 'Em análise',
    coleta: 'Aguardando coleta',
  };

  let dataFormatada = 'Data não informada';
  try {
    const dataObj = new Date(data);
    if (!isNaN(dataObj.getTime())) {
      dataFormatada = format(dataObj, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    }
  } catch {
    // Ignoring invalid date parsing errors
  }

  const urlCompleta = anexo ? `http://localhost:8000/uploads/${anexo}` : null;
  const isImagem = anexo?.match(/\.(jpe?g|png|gif|webp)$/i);

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
        <p className={`mb-6 text-sm font-medium ${statusClasses[status]}`}>
          {statusLabels[status]}
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
