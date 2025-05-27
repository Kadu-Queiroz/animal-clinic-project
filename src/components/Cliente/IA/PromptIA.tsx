import { useState } from 'react';
import { useAuth } from '@/context/useAuth';
import { IAModalCalendario } from '@/components/Cliente/Calendario/IAModalCalendario';
import type { RespostaIA, AgendamentoData } from '@/types/tutor';
import api from '@/services/api';
import { EventInput } from '@fullcalendar/core';

interface MensagemIA {
  id: number;
  origem: 'cliente' | 'ia';
  texto: string;
}

interface PromptIAProps {
  onClose?: () => void;
}

export function PromptIA({ onClose }: PromptIAProps) {
  const { tutor } = useAuth();
  const [mensagem, setMensagem] = useState('');
  const [historico, setHistorico] = useState<MensagemIA[]>([]);
  const [dadosPendentes, setDadosPendentes] = useState<AgendamentoData | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [eventosIA, setEventosIA] = useState<EventInput[]>([]);

  const enviarMensagem = async (confirmar = false) => {
    if (!mensagem && !confirmar) return;

    const corpo = {
      mensagem: confirmar ? (historico.at(-1)?.texto ?? '') : mensagem,
      confirmar,
    };

    try {
      const { data } = await api.post<RespostaIA>('/ia/prompt', corpo);

      if (!confirmar) {
        setHistorico(h => [...h, { id: h.length, origem: 'cliente', texto: mensagem }]);
      }

      const respostaFormatada = data.resposta.replace('cliente', tutor?.nome || 'cliente');
      setHistorico(h => [...h, { id: h.length + 1, origem: 'ia', texto: respostaFormatada }]);

      if (data.dados?.data && data.dados?.hora) {
        setDadosPendentes(data.dados);
      }

      if (confirmar && data.sucesso && data.dados?.data) {
        const evento: EventInput = {
          title: `${data.dados.tipo || 'Consulta'} (${data.dados.pet})`,
          start: `${data.dados.data}T${data.dados.hora}`,
        };
        setEventosIA([evento]);
        setModalAberto(true);
        setDadosPendentes(null);
      }

      setMensagem('');
    } catch (err) {
      console.error('Erro ao processar IA:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-2xl border border-[#D96E30] bg-[#FDFDFD]/90 p-6 text-[#002B3D] shadow-xl dark:bg-[#002B3D] dark:text-white">
        <h2 className="mb-4 text-2xl font-bold">IA Toka dos Pets</h2>

        <div className="mb-4 h-72 overflow-y-auto rounded border border-[#8B947F]/30 bg-[#F9F9F9] p-3 dark:bg-zinc-800">
          {historico.map(msg => (
            <div
              key={msg.id}
              className={`mb-2 max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm ${
                msg.origem === 'cliente'
                  ? 'ml-auto bg-[#D96E30] text-white'
                  : 'mr-auto bg-[#EDF2F7] text-[#002B3D] dark:bg-zinc-700 dark:text-white'
              }`}
            >
              {msg.texto}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={mensagem}
            onChange={e => setMensagem(e.target.value)}
            className="flex-1 rounded-lg border border-[#8B947F] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D96E30]"
            placeholder="Ex: Quero agendar consulta para o Rex amanhã às 10h"
          />
          <button
            onClick={() => enviarMensagem()}
            className="rounded-lg bg-[#D96E30] px-4 py-2 text-white shadow hover:bg-[#b85b23]"
          >
            Enviar
          </button>
        </div>

        {dadosPendentes && (
          <div className="mt-4 rounded-md border border-[#D96E30] bg-[#FFF8EC] p-4 text-sm shadow-sm">
            <p className="mb-1 font-semibold">A IA encontrou um horário disponível:</p>
            <p className="mb-2">
              <strong>{dadosPendentes.pet}</strong> — {dadosPendentes.data} às {dadosPendentes.hora}
            </p>
            <button
              onClick={() => enviarMensagem(true)}
              className="rounded bg-emerald-600 px-3 py-1 text-white hover:bg-emerald-700"
            >
              Confirmar Agendamento
            </button>
          </div>
        )}

        <IAModalCalendario
          aberto={modalAberto}
          aoFechar={() => setModalAberto(false)}
          eventos={eventosIA}
        />

        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-red-500"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
