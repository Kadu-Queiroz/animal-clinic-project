import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { HeaderCliente, NavTabs } from '@/components/Cliente';
import { EtapaPet } from './components/EtapaPet';
import { EtapaServico } from './components/EtapaServico';
import { EtapaDataHora } from './components/EtapaDataHora';
import { EtapaConfirmacao } from './components/EtapaConfirmacao';

const formSchema = z.object({
  pet: z.string().min(1, 'Selecione um pet'),
  servico: z.string().min(1, 'Selecione um serviço'),
  data: z.string().min(1, 'Escolha uma data'),
  hora: z.string().min(1, 'Escolha um horário'),
});

type FormularioAgendamento = z.infer<typeof formSchema>;

export default function Agendar() {
  const methods = useForm<FormularioAgendamento>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const [etapa, setEtapa] = useState(1);
  const { handleSubmit, reset } = methods;

  const avancar = () => setEtapa(prev => prev + 1);
  const voltar = () => setEtapa(prev => prev - 1);

  const onSubmit = (data: FormularioAgendamento) => {
    // Aqui você pode fazer o POST para a IA ou agenda própria
    console.log('[AGENDAMENTO FINALIZADO]', data);
    alert('Consulta agendada com sucesso!');
    reset();
    setEtapa(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderCliente />
      <NavTabs active="agendar" />

      <main className="container mx-auto max-w-xl px-4 py-8">
        <h1 className="font-montserrat mb-6 text-2xl font-bold text-[#05334D]">Agendar Consulta</h1>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {etapa === 1 && <EtapaPet onNext={avancar} />}
            {etapa === 2 && <EtapaServico onNext={avancar} onBack={voltar} />}
            {etapa === 3 && <EtapaDataHora onNext={avancar} onBack={voltar} />}
            {etapa === 4 && <EtapaConfirmacao onBack={voltar} onSubmit={handleSubmit(onSubmit)} />}
          </form>
        </FormProvider>
      </main>
    </div>
  );
}
