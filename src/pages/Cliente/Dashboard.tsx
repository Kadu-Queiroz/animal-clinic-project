import {
  HeaderCliente,
  NavTabs,
  ConsultaCard,
  ExamesResumoCard,
  LembreteCard,
  PetCard,
} from '@/components/Cliente';
import { useClienteData } from '@/hooks/useClienteData';

export default function Dashboard() {
  const { data, loading } = useClienteData();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="font-medium text-[#05334D]">Carregando informações do tutor...</p>
      </div>
    );
  }

  if (!data) {
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
          Olá, {data.nome}!
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.nextAppointments.map((apt, i) => (
            <ConsultaCard key={i} {...apt} />
          ))}
          <ExamesResumoCard count={data.pendingExams} />
          <LembreteCard lembretes={data.reminders} />
        </div>

        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-[#05334D]">Meus Pets</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.pets.map(pet => (
              <PetCard key={pet.id} {...pet} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
