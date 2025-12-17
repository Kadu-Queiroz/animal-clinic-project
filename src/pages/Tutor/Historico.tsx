import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

import { useExames } from '@/hooks/Tutor/useExames';
import { ExameCard } from '@/components/Tutor';
import type { ExameData } from '@/types/tutor';
import type { ConsultaResumoTutor } from '@/types/tutor/consulta_tutor';
import { buscarConsultasHistoricasDoTutor } from '@/services/Tutor/tutor-service';

// ---------------- UX helpers ----------------
type Secao = 'tudo' | 'consultas' | 'exames';

const STATUS_CONSULTAS = [
  { value: 'todas', label: 'Todas' },
  { value: 'realizada', label: 'Realizada/Concluída' },
  { value: 'cancelada', label: 'Cancelada' },
  { value: 'faltou', label: 'Faltou' },
  { value: 'concluida', label: 'Concluída' },
];

const STATUS_EXAMES = [
  { value: 'todos', label: 'Todos' },
  { value: 'disponivel', label: 'Disponível' },
  { value: 'analise', label: 'Em Análise' },
  { value: 'coleta', label: 'Aguardando Coleta' },
];

// Badge simples por status de consulta
function ConsultaBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  let cls = 'bg-gray-200 text-gray-700';
  if (s === 'realizada' || s === 'concluida') cls = 'bg-green-100 text-green-800';
  else if (s === 'cancelada') cls = 'bg-red-100 text-red-700';
  else if (s === 'faltou') cls = 'bg-amber-100 text-amber-800';

  return <span className={`rounded px-2 py-0.5 text-xs font-semibold ${cls}`}>{status}</span>;
}

// Item compacto de consulta para o histórico
function ConsultaHistoricoItem({ c }: { c: ConsultaResumoTutor }) {
  const data = new Date(c.data_hora);
  const dataFormatada = isNaN(data.getTime())
    ? '--/--/----'
    : format(data, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });

  return (
    <div className="rounded-lg border border-[#8B947F]/30 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-semibold capitalize text-[#05334D]">
          {c.tipo || 'Consulta'}
        </h3>
        <ConsultaBadge status={c.status} />
      </div>

      <p className="text-sm text-gray-600">
        <span className="font-medium">{c.pet ?? 'Pet'}</span> • {dataFormatada}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Veterinário: <span className="font-medium">{c.veterinario_nome || 'N/D'}</span>
      </p>

      {/* CTA futuro: abrir modal com observações / detalhes */}
      {/* <button className="mt-3 text-sm font-semibold text-[#05334D] underline">Ver detalhes</button> */}
    </div>
  );
}

export default function Historico() {
  // Seção ativa
  const [secao, setSecao] = useState<Secao>('tudo');

  // Período
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  // Filtros por status (contextuais)
  const [statusConsulta, setStatusConsulta] = useState('todas');
  const [statusExame, setStatusExame] = useState<'todos' | 'disponivel' | 'analise' | 'coleta'>(
    'todos',
  );

  // Exames (hook existente)
  const { exames, carregando: loadingExames, erro: errorExames } = useExames();

  // Consultas históricas (novo fetch)
  const [consultas, setConsultas] = useState<ConsultaResumoTutor[]>([]);
  const [loadingConsultas, setLoadingConsultas] = useState(false);
  const [errorConsultas, setErrorConsultas] = useState<string | null>(null);

  // Carrega consultas passadas ao montar ou quando filtros mudarem
  useEffect(() => {
    let ignore = false;

    async function run() {
      try {
        setLoadingConsultas(true);
        setErrorConsultas(null);

        const token = localStorage.getItem('token') || '';
        const statusParam = statusConsulta === 'todas' ? undefined : statusConsulta; // minúsculo, condizente com a rota
        const dados = await buscarConsultasHistoricasDoTutor(token, {
          de: dataInicio || undefined,
          ate: dataFim || undefined,
          status: statusParam,
        });

        if (!ignore) setConsultas(dados);
      } catch (e) {
        if (!ignore) setErrorConsultas('Erro ao carregar consultas.');
        console.error(e);
      } finally {
        if (!ignore) setLoadingConsultas(false);
      }
    }

    run();
    return () => {
      ignore = true;
    };
  }, [dataInicio, dataFim, statusConsulta]);

  // ---- Filtro de EXAMES no front (mantém o comportamento atual) ----
  const examesFiltrados: ExameData[] = useMemo(() => {
    return exames.filter(exame => {
      const tipoMatch =
        statusExame === 'todos' || exame.status?.toLowerCase() === statusExame.toLowerCase();

      const dataExame = new Date(exame.data);
      const ini = dataInicio ? new Date(dataInicio) : null;
      const fim = dataFim ? new Date(dataFim) : null;

      const within = (!ini || dataExame >= ini) && (!fim || dataExame <= fim);

      return tipoMatch && within;
    });
  }, [exames, statusExame, dataInicio, dataFim]);

  // Estado combinado para "Tudo"
  const isLoading = loadingConsultas || loadingExames;
  const hasError = !!errorConsultas || !!errorExames;

  return (
    <>
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold text-[#05334D]">Histórico de Saúde</h1>
        <p className="text-gray-600">Veja consultas e exames já realizados.</p>
      </div>

      {/* Pílulas de seção */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(['tudo', 'consultas', 'exames'] as Secao[]).map(val => (
          <button
            key={val}
            type="button"
            onClick={() => setSecao(val)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              secao === val
                ? 'border-2 border-[#CC6E28] bg-white text-[#05334D]'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {val === 'tudo' ? 'Tudo' : val.charAt(0).toUpperCase() + val.slice(1)}
          </button>
        ))}
      </div>

      {/* Filtros (período sempre, status contextual) */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Status contextual */}
        {secao === 'consultas' && (
          <select
            value={statusConsulta}
            onChange={e => setStatusConsulta(e.target.value)}
            className="w-full rounded border border-gray-300 px-4 py-2 text-sm text-[#05334D]"
          >
            {STATUS_CONSULTAS.map(s => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        )}

        {secao === 'exames' && (
          <select
            value={statusExame}
            onChange={e => setStatusExame(e.target.value as typeof statusExame)}
            className="w-full rounded border border-gray-300 px-4 py-2 text-sm text-[#05334D]"
          >
            {STATUS_EXAMES.map(s => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        )}

        {/* Período */}
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

      {/* Mensagens de carregamento/erro */}
      {isLoading && <p className="text-[#05334D]">Carregando histórico...</p>}
      {hasError && <p className="text-red-600">Erro ao carregar dados.</p>}

      {/* Renderização por seção */}
      {!isLoading && !hasError && (
        <>
          {secao !== 'exames' && (
            <>
              <h2 className="mb-3 text-lg font-semibold text-[#05334D]">Consultas</h2>
              {consultas.length === 0 ? (
                <p className="mb-6 text-[#8B947F]">Nenhuma consulta encontrada no período.</p>
              ) : (
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {consultas.map(c => (
                    <ConsultaHistoricoItem key={c.id} c={c} />
                  ))}
                </div>
              )}
            </>
          )}

          {secao !== 'consultas' && (
            <>
              <h2 className="mb-3 text-lg font-semibold text-[#05334D]">Exames</h2>
              {examesFiltrados.length === 0 ? (
                <p className="text-[#8B947F]">Nenhum exame encontrado com os filtros atuais.</p>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {examesFiltrados.map((exame, i) => (
                    <ExameCard key={i} {...exame} />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
