import { HeaderCliente, NavTabs, ExameCard } from '@/components/Cliente';
import { VoltarButton } from '@/components/shared/VoltarButton';
import { useExames } from '@/hooks/useExames';

export default function Exames() {
  const { exames, loading, error } = useExames();

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderCliente />
      <NavTabs active="exames" />

      <main className="container mx-auto px-4 py-8">
        {/* Cabeçalho com botão de voltar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-montserrat text-2xl font-bold text-[#05334D]">Meus Exames</h1>
          <VoltarButton to="/cliente/dashboard" label="Voltar ao Dashboard" />
        </div>

        {loading && <p className="text-[#05334D]">Carregando exames...</p>}

        {error && <p className="text-red-600">Erro ao carregar exames. Tente novamente.</p>}

        {!loading && exames && exames.length === 0 && (
          <p className="text-center text-[#8B947F]">Nenhum exame encontrado no momento.</p>
        )}

        {!loading && exames && exames.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exames.map((exame, i) => (
              <ExameCard key={i} {...exame} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
