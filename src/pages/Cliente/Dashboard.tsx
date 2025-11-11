import {
  ConsultaCard,
  ExamesResumoCard,
  LembreteCard,
  PetCard,
  ExameCard,
} from '@/components/Cliente';
import { GerenciarConsultasCard } from '@/components/Cliente/GerenciarConsultasCard';
import { useDashboard } from '@/hooks/Cliente/useDashboard';
import type { ConsultaResumoTutor } from '@/types/tutor/consulta_tutor';
import type { ExameData } from '@/types/tutor/exame_tutor';

export default function Dashboard() {
  const { dados, carregando, erro, refetch } = useDashboard();

  if (carregando) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-medium text-[#05334D]">Carregando seu painel...</p>
      </div>
    );
  }

  if (erro || !dados) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-red-600">Erro ao carregar os dados. Tente novamente.</p>
      </div>
    );
  }

  // Próxima consulta = primeira (o back já ordena ASC para 'futuras')
  const proximaConsulta: ConsultaResumoTutor | undefined =
    Array.isArray(dados.consultas) && dados.consultas.length > 0 ? dados.consultas[0] : undefined;

  // helper pra key estável sem depender de campos extras
  const exameKey = (e: ExameData) =>
    e.id ?? `${e.tipo}-${e.data_realizacao ?? e.data_solicitacao ?? 's/ data'}`;

  return (
    <>
      <h1 className="font-montserrat mb-8 text-2xl font-bold text-[#05334D]">Olá, {dados.nome}!</h1>

      {/* Resumo: Próxima consulta, Ações (Agendar/Remarcar) e Exames Pendentes */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ConsultaCard
          data_hora={proximaConsulta?.data_hora}
          tipo={proximaConsulta?.tipo}
          status={proximaConsulta?.status}
          veterinario_nome={proximaConsulta?.veterinario_nome}
        />

        <GerenciarConsultasCard
          proximaConsulta={proximaConsulta}
          onAgendado={refetch}
          onRemarcado={refetch}
        />

        <ExamesResumoCard count={dados.exames_pendentes ?? 0} />
      </div>

      {/* Lembretes */}
      <div className="mt-6">
        <LembreteCard lembretes={dados.lembretes ?? []} />
      </div>

      {/* Pets do Tutor */}
      {Array.isArray(dados.pets) && dados.pets.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-[#05334D]">Meus Pets</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {dados.pets.map(pet => (
              <PetCard key={pet.id} {...pet} />
            ))}
          </div>
        </section>
      )}

      {/* Exames Recentes (máx. 2 já tratados no hook) */}
      {Array.isArray(dados.exames) && dados.exames.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-[#05334D]">Exames Recentes</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dados.exames.map((exame: ExameData) => (
              <ExameCard key={exameKey(exame)} {...exame} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
