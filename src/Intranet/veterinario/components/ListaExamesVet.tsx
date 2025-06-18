import { ExameVet } from '@/types/intranet/exame_intranet';

interface ListaExamesVetProps {
  exames: ExameVet[];
  onSelecionar: (exame: ExameVet) => void;
}

export function ListaExamesVet({ exames, onSelecionar }: ListaExamesVetProps) {
  if (exames.length === 0) {
    return <p className="text-gray-500">Nenhum exame encontrado.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Paciente</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Tipo</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Data</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Novo</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {exames.map(exame => (
            <tr
              key={exame.id}
              className="cursor-pointer transition hover:bg-gray-100"
              onClick={() => onSelecionar(exame)}
            >
              <td className="px-4 py-2">{exame.animal.nome}</td>
              <td className="px-4 py-2 capitalize">{exame.tipo}</td>
              <td className="px-4 py-2">
                {new Date(exame.data_realizacao || exame.data_solicitacao).toLocaleDateString(
                  'pt-BR',
                )}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                    exame.status === 'pendente'
                      ? 'bg-yellow-100 text-yellow-800'
                      : exame.status === 'em_analise'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                  }`}
                >
                  {exame.status}
                </span>
              </td>
              <td className="px-4 py-2">
                {!exame.lido_vet && (
                  <span className="inline-block rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                    Novo
                  </span>
                )}
              </td>
              <td className="px-4 py-2 text-right text-sm text-blue-500">Ver detalhes</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
