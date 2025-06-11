import {
  ConsultaCard,
  ExamesResumoCard,
  LembreteCard,
  PetCard,
  ExameCard,
} from '@/components/Cliente';
import { useDashboard } from '@/hooks/useDashboard';

export default function Dashboard() {
  const { dados, carregando, erro } = useDashboard();

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

  return (
    <>
      <h1 className="font-montserrat mb-8 text-2xl font-bold text-[#05334D]">Olá, {dados.nome}!</h1>

      {/* Bloco Resumo com Consultas, Exames Pendentes e Lembretes */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dados.consultas?.map((consulta, i) => <ConsultaCard key={i} {...consulta} />)}
        <ExamesResumoCard count={dados.exames_pendentes ?? 0} />
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

      {/* Exames Recentes */}
      {Array.isArray(dados.exames) && dados.exames.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-[#05334D]">Exames Recentes</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dados.exames.map((exame, i) => (
              <ExameCard key={i} {...exame} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
