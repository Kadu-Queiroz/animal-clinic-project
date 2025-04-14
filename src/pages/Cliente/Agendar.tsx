import { useState } from 'react';
import { CalendarioInterativo } from '@/components/Cliente/CalendarioInterativo';
import { ModalAgendamento } from '@/components/Cliente/ModalAgendamento';

const pets = ['Totó', 'Luna'];
const servicos = ['Consulta', 'Vacinação', 'Retorno', 'Exame'];

export default function Agendar() {
  const [pet, setPet] = useState('');
  const [servico, setServico] = useState('');
  const [data, setData] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  const podeAvancar = pet && servico && data;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-xl">
        <h1 className="text-2xl font-bold text-[#05334D] mb-8">Agendar Consulta</h1>

        {/* Etapa 1: Selecionar Pet */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-[#05334D]">Selecione o Pet</label>
          <select
            value={pet}
            onChange={(e) => setPet(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CC6E28]"
          >
            <option value="">-- Escolha um pet --</option>
            {pets.map((p, i) => (
              <option key={i} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Etapa 2: Selecionar Serviço */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-[#05334D]">Tipo de Serviço</label>
          <select
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CC6E28]"
          >
            <option value="">-- Escolha o serviço --</option>
            {servicos.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Etapa 3: Calendário */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-[#05334D]">Escolha uma data</label>
          <CalendarioInterativo onSelectDate={setData} selectedDate={data} />
        </div>

        <button
          className={`w-full px-4 py-2 rounded text-white font-semibold transition ${
            podeAvancar
              ? 'bg-[#CC6E28] hover:bg-[#b55f22]'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          onClick={() => podeAvancar && setModalAberto(true)}
          disabled={!podeAvancar}
        >
          Agendar
        </button>
      </div>

      <ModalAgendamento
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        pet={pet}
        servico={servico}
        data={data}
      />
    </div>
  );
}