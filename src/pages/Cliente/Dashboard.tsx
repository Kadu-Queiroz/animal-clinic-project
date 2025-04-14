import {
    HeaderCliente,
    NavTabs,
    ConsultaCard,
    ExamesResumoCard,
    LembreteCard,
    PetCard,
  } from '@/components/Cliente';
  
  const userData = {
    name: "Maria Silva",
    pets: [
      {
        name: "Totó",
        type: "Golden Retriever",
        status: "Saúde estável",
        image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&q=80&w=200&h=200",
      },
      {
        name: "Luna",
        type: "Gato Siamês",
        status: "Vacinação pendente",
        image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80&w=200&h=200",
      },
    ],
    nextAppointments: [
      { date: "15/03/2024", time: "14:00", pet: "Totó", type: "Check-up Anual" },
    ],
    pendingExams: 2,
    reminders: [
      { pet: "Totó", message: "Próxima dose em 5 dias" },
    ],
  };
  
  export default function Dashboard() {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderCliente />
        <NavTabs active="dashboard" />
  
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold font-montserrat text-[#05334D] mb-8">
            Olá, {userData.name}!
          </h1>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData.nextAppointments.map((apt, i) => (
              <ConsultaCard key={i} {...apt} />
            ))}
            <ExamesResumoCard count={userData.pendingExams} />
            <LembreteCard lembretes={userData.reminders} />
          </div>
  
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-[#05334D] mb-6">Meus Pets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userData.pets.map((pet, i) => (
                <PetCard key={i} {...pet} />
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }  