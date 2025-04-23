import { useState } from 'react';
import { PromptIA } from '../components/Cliente/IA/PromptIA';

export function PromptIAFlutuante() {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      {!aberto && (
        <button
          onClick={() => setAberto(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border-2 border-[#CC6E28] bg-white p-2 shadow-lg transition hover:scale-105 dark:bg-zinc-800"
        >
          <img
            src="/IAIconTransparente.png"
            alt="IA da clínica"
            className="h-10 w-10 rounded-full"
            loading="lazy"
          />

          <span className="pr-2 text-sm font-medium text-[#05334D] dark:text-white">
            Fale comigo!
          </span>
        </button>
      )}

      {aberto && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[90vw]">
          <div className="overflow-hidden rounded-xl border border-[#CC6E28] bg-white shadow-xl dark:bg-zinc-900">
            <div className="flex items-center justify-between bg-[#CC6E28] px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <img
                  src="/IAIconTransparente.png"
                  alt="IA da clínica"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm font-bold">Ivy • Assistente IA</span>
              </div>
              <button
                onClick={() => setAberto(false)}
                className="text-lg text-white transition hover:text-zinc-200"
              >
                ×
              </button>
            </div>
            <div className="max-h-[480px] overflow-y-auto p-3">
              <PromptIA />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
