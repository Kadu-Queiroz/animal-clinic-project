import { useState } from 'react';
import { useExames } from '@/hooks/Cliente/useExames';
import { ExameCard } from '@/components/Cliente';
import type { ExameData } from '@/types/tutor';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

export default function Historico() {
  const { exames, loading, error } = useExames();
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'imagem' | 'laboratorial'>('todos');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const filtrarExames = (): ExameData[] => {
    return exames.filter(exame => {
      const tipoMatch =
        filtroTipo === 'todos' || exame.tipo.toLowerCase() === filtroTipo.toLowerCase();

      const dataExame = new Date(exame.data);
      const dataInicioVal = dataInicio ? new Date(dataInicio) : null;
      const dataFimVal = dataFim ? new Date(dataFim) : null;

      const dataDentroDoIntervalo =
        (!dataInicioVal || dataExame >= dataInicioVal) && (!dataFimVal || dataExame <= dataFimVal);

      return tipoMatch && dataDentroDoIntervalo;
    });
  };

  const examesFiltrados = filtrarExames();

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-[#05334D]">Histórico de Saúde</h1>
        <p className="text-gray-600">
          Visualize todos os exames realizados pelos seus pets ao longo do tempo.
        </p>
        {(dataInicio || dataFim) && (
          <p className="mt-1 text-sm text-gray-500">
            {dataInicio && (
              <>
                De{' '}
                <strong>
                  {format(new Date(dataInicio), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </strong>{' '}
              </>
            )}
            {dataFim && (
              <>
                até{' '}
                <strong>
                  {format(new Date(dataFim), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </strong>
              </>
            )}
          </p>
        )}
      </div>

      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <select
          value={filtroTipo}
          onChange={e => setFiltroTipo(e.target.value as 'todos' | 'imagem' | 'laboratorial')}
          className="w-full rounded border border-gray-300 px-4 py-2 text-sm text-[#05334D]"
        >
          <option value="todos">Todos os Tipos</option>
          <option value="imagem">Exames de Imagem</option>
          <option value="laboratorial">Exames Laboratoriais</option>
        </select>

        <input
          type="date"
          value={dataInicio}
          onChange={e => setDataInicio(e.target.value)}
          className="w-full rounded border border-gray-300 px-4 py-2 text-sm text-[#05334D]"
        />
        <input
          type="date"
          value={dataFim}
          onChange={e => setDataFim(e.target.value)}
          className="w-full rounded border border-gray-300 px-4 py-2 text-sm text-[#05334D]"
        />
      </div>

      {/* Carregando ou erro */}
      {loading && <p className="text-[#05334D]">Carregando exames...</p>}
      {error && <p className="text-red-600">Erro ao carregar exames.</p>}

      {/* Resultado */}
      {examesFiltrados.length === 0 && !loading && !error && (
        <p className="text-center text-[#8B947F]">Nenhum exame encontrado com os filtros atuais.</p>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {examesFiltrados.map((exame, i) => (
          <ExameCard key={i} {...exame} />
        ))}
      </div>
    </>
  );
}
