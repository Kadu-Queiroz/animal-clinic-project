import {
  HeaderCliente,
  NavTabs,
  ConsultaCard,
  ExamesResumoCard,
  LembreteCard,
  PetCard,
} from '@/components/Cliente';
import { useClienteData } from '@/hooks/useClienteData';
import { useExames } from '@/hooks/useExames';
import { ExameCard } from '@/components/Cliente/ExameCard';

export default function Dashboard() {
  const { dados, carregando } = useClienteData();
  const { exames, loading: carregandoExames } = useExames();

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="font-medium text-[#05334D]">Carregando informações do tutor...</p>
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-red-600">Erro ao carregar os dados. Tente novamente.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderCliente />
      <NavTabs active="dashboard" />

      <main className="container mx-auto px-4 py-8">
        <h1 className="font-montserrat mb-8 text-2xl font-bold text-[#05334D]">
          Olá, {dados.nome}!
        </h1>

        {/* Seção de destaques */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dados.consultas.map((consulta, i) => (
            <ConsultaCard key={i} {...consulta} />
          ))}
          <ExamesResumoCard count={dados.exames_pendentes} />
          <LembreteCard lembretes={dados.lembretes} />
        </div>

        {/* Pets */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-[#05334D]">Meus Pets</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {dados.pets.map(pet => (
              <PetCard key={pet.id} {...pet} />
            ))}
          </div>
        </section>

        {/* Exames (modularizado) */}
        {!carregandoExames && exames.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-semibold text-[#05334D]">Exames Recentes</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {exames.map((exame, i) => (
                <ExameCard key={i} {...exame} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
