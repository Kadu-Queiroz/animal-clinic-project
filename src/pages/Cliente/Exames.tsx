import { HeaderCliente, NavTabs, ExameCard } from '@/components/Cliente';
import { useExames } from '@/hooks/useExames';

export default function Exames() {
  const { exames, loading, error } = useExames();

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderCliente />
      <NavTabs active="exames" />

      <main className="container mx-auto px-4 py-8">
        <h1 className="font-montserrat mb-8 text-2xl font-bold text-[#05334D]">Meus Exames</h1>

        {loading && <p className="text-[#05334D]">Carregando exames...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && exames.length === 0 && (
          <p className="text-center text-[#8B947F]">Nenhum exame encontrado no momento.</p>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exames.map((exame, i) => (
            <ExameCard key={i} {...exame} />
          ))}
        </div>
      </main>
    </div>
  );
}
