import { useState } from 'react';
import { PromptIA } from './PromptIA';
import IAIcon from '/IAIconTransparente.png';

export function IAAvatarButton() {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      {/* Botão Flutuante */}
      <div
        role="button"
        aria-label="Abrir assistente virtual"
        onClick={() => setAberto(true)}
        className="group fixed bottom-6 right-6 z-50 flex cursor-pointer flex-col items-center transition-all"
      >
        {/* Balão de fala animado */}
        <div className="relative mb-2">
          <div className="absolute -left-4 -top-8 w-max rounded-xl bg-[#D96E30] px-3 py-2 text-sm font-semibold text-white opacity-0 shadow-lg transition duration-300 before:absolute before:-bottom-2 before:left-4 before:border-8 before:border-transparent before:border-t-[#D96E30] group-hover:opacity-100">
            Sou a assitente virtual! 🐾
          </div>
        </div>

        {/* Avatar */}
        <div className="rounded-full border-4 border-[#D96E30] bg-white p-1 shadow-lg transition-transform hover:scale-105 dark:bg-zinc-800">
          <img src={IAIcon} alt="Assistente IA" className="h-16 w-16 rounded-full object-contain" />
        </div>
      </div>

      {/* Modal do Prompt */}
      {aberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <PromptIA onClose={() => setAberto(false)} />
        </div>
      )}
    </>
  );
}
