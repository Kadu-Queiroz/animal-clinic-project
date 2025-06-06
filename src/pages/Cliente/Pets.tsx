import { useClienteData } from '@/hooks/useClienteData';
import { PetCard } from '@/components/Cliente/PetCard';
import { Loader } from 'lucide-react';

export default function Pets() {
  const { dados, carregando, erro } = useClienteData();

  console.log('[Pets] dados:', dados);
  console.log('[Pets] carregando:', carregando);
  console.log('[Pets] erro:', erro);

  if (carregando) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="animate-spin text-[#05334D]" size={32} />
        <span className="ml-2 text-[#05334D]">Carregando seus pets...</span>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="p-6 text-center text-red-600">
        Ocorreu um erro ao carregar os dados dos pets: {erro}
      </div>
    );
  }

  if (!dados || !dados.pets || dados.pets.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">Você ainda não cadastrou nenhum pet.</div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-semibold text-[#05334D]">Meus Pets</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {dados.pets.map(pet => (
          <PetCard key={pet.id} {...pet} />
        ))}
      </div>
    </main>
  );
}
