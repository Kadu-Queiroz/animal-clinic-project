import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';

import { EtapaPet } from '@/pages/Cliente/Agendar/components/EtapaPet';
import { EtapaServico } from '@/pages/Cliente/Agendar/components/EtapaServico';
import { EtapaDataHora } from '@/pages/Cliente/Agendar/components/EtapaDataHora';
import { EtapaConfirmacao } from '@/pages/Cliente/Agendar/components/EtapaConfirmacao';

const formSchema = z.object({
  pet: z.string().min(1, 'Selecione um pet'),
  servico: z.string().min(1, 'Selecione um serviço'),
  data: z.string().min(1, 'Escolha uma data'),
  hora: z.string().min(1, 'Escolha um horário'),
});

type FormularioAgendamento = z.infer<typeof formSchema>;

interface AgendamentoModalProps {
  aberto: boolean;
  onClose: () => void;
}

export function AgendamentoModal({ aberto, onClose }: AgendamentoModalProps) {
  const methods = useForm<FormularioAgendamento>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const [etapa, setEtapa] = useState(1);
  const { handleSubmit, reset } = methods;

  const avancar = () => setEtapa(prev => prev + 1);
  const voltar = () => setEtapa(prev => prev - 1);

  const onSubmit = (data: FormularioAgendamento) => {
    console.log('[AGENDAMENTO FINALIZADO]', data);
    alert('Consulta agendada com sucesso!');
    reset();
    setEtapa(1);
    onClose();
  };

  return (
    <Dialog open={aberto} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-start justify-between">
            <DialogTitle className="text-xl font-bold text-[#05334D]">
              Agendamento de Consulta
            </DialogTitle>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500">
              <X size={20} />
            </button>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {etapa === 1 && <EtapaPet onNext={avancar} />}
              {etapa === 2 && <EtapaServico onNext={avancar} onBack={voltar} />}
              {etapa === 3 && <EtapaDataHora onNext={avancar} onBack={voltar} />}
              {etapa === 4 && (
                <EtapaConfirmacao onBack={voltar} onSubmit={handleSubmit(onSubmit)} />
              )}
            </form>
          </FormProvider>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
