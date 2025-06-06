import { useState } from 'react';
import {
  HeaderCliente,
  NavTabs,
  ConsultaCard,
  ExamesResumoCard,
  LembreteCard,
  PetCard,
  ExameCard,
} from '@/components/Cliente';
import { IAAvatarButton } from '@/components/Cliente/IA/IAAvatarButton';
import { PromptIA } from '@/components/Cliente/IA/PromptIA';

import { useClienteData } from '@/hooks/useClienteData';
import { useExames } from '@/hooks/useExames';

export default function Dashboard() {
  const { dados, carregando } = useClienteData();
  const { exames, loading: carregandoExames } = useExames();
  const [chatAberto, setChatAberto] = useState(false);

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
    <div className="relative min-h-screen bg-gray-50">
      <HeaderCliente />
      <NavTabs active="dashboard" />

      <main className="container mx-auto px-4 py-8">
        <h1 className="font-montserrat mb-8 text-2xl font-bold text-[#05334D]">
          Olá, {dados.nome}!
        </h1>

        {/* Destaques do dia */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dados.consultas.map((consulta, i) => (
            <ConsultaCard key={i} {...consulta} />
          ))}
          <ExamesResumoCard count={dados.exames_pendentes} />
          <LembreteCard lembretes={dados.lembretes} />
        </div>

        {/* Pets do tutor */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-[#05334D]">Meus Pets</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {dados.pets.map(pet => (
              <PetCard key={pet.id} {...pet} />
            ))}
          </div>
        </section>

        {/* Exames recentes */}
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

      {/* IA flutuante */}
      <IAAvatarButton onClick={() => setChatAberto(true)} />

      {chatAberto && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/20 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md">
            <PromptIA onClose={() => setChatAberto(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
