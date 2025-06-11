import { Outlet } from 'react-router-dom';
import { HeaderCliente, NavTabs } from '@/components/Cliente';
import { useState } from 'react';

export default function LayoutCliente() {
  const [chatAberto, setChatAberto] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Cabeçalho e navegação padrão do cliente */}
      <HeaderCliente />
      <NavTabs />

      {/* Conteúdo dinâmico da rota atual */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Placeholder para IA futura */}
      {chatAberto && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/20 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md">
            <div className="rounded-lg bg-white p-4 shadow dark:bg-zinc-900">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                Em breve, sua assistente IA estará disponível para ajudar com agendamentos, exames e
                muito mais. 🐾
              </p>
              <button
                onClick={() => setChatAberto(false)}
                className="mt-4 rounded bg-[#CC6E28] px-4 py-2 text-sm text-white hover:bg-[#b55f22]"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
