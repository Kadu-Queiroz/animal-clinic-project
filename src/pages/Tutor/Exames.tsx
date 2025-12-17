import { ExameCard } from '@/components/Tutor';
import { VoltarButton } from '@/components/shared/VoltarButton';
import { useExames } from '@/hooks/Tutor/useExames';

export default function Exames() {
  const { exames, carregando, erro } = useExames();

  const temExames = exames.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-montserrat text-2xl font-bold text-[#05334D]">Meus Exames</h1>

          <VoltarButton to="/tutor/dashboard" label="Voltar ao Dashboard" />
        </div>

        {carregando && <p className="text-[#05334D]">Carregando exames...</p>}

        {!carregando && erro && (
          <p className="text-red-600">Erro ao carregar exames. Tente novamente.</p>
        )}

        {!carregando && !erro && !temExames && (
          <p className="text-center text-[#8B947F]">Nenhum exame encontrado no momento.</p>
        )}

        {!carregando && !erro && temExames && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exames.map(exame => (
              <ExameCard key={exame.id} {...exame} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
