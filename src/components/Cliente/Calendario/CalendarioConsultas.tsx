import { useEffect, useState } from 'react';
import { useAuth } from '@/context/useAuth';
import { buscarConsultasDoCliente } from '@/services/cliente';
import type { ConsultaData } from '@/types/cliente';
import type { EventInput } from '@fullcalendar/core';

interface CalendarioConsultasProps {
  onSelecionarConsulta?: (consulta: ConsultaData) => void;
  eventos?: EventInput[];
}

export function CalendarioConsultas({ onSelecionarConsulta }: CalendarioConsultasProps) {
  const { tutor } = useAuth();
  const [consultas, setConsultas] = useState<ConsultaData[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<string>('');

  useEffect(() => {
    if (tutor?.cpf) {
      buscarConsultasDoCliente(tutor.cpf).then(setConsultas).catch(console.error);
    }
  }, [tutor?.cpf]);

  const diasComConsulta = consultas.map(
    consulta => new Date(consulta.data_hora).toISOString().split('T')[0],
  );

  const getLabel = (dataStr: string) => {
    const date = new Date(dataStr);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {diasComConsulta.map(data => {
        const isSelected = dataSelecionada === data;
        const consulta = consultas.find(
          c => new Date(c.data_hora).toISOString().split('T')[0] === data,
        );

        return (
          <button
            key={data}
            onClick={() => {
              setDataSelecionada(data);
              if (consulta && onSelecionarConsulta) onSelecionarConsulta(consulta);
            }}
            className={`rounded-lg border p-4 text-sm font-medium transition ${
              isSelected
                ? 'border-transparent bg-[#CC6E28] text-white'
                : 'border-[#8B947F] bg-white text-[#05334D] hover:bg-[#8B947F]/10'
            }`}
          >
            {getLabel(data)}
          </button>
        );
      })}
    </div>
  );
}
