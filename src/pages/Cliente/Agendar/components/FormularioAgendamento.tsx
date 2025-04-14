import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { agendamentoSchema, AgendamentoData } from '../schema';
import { EtapaPet } from './EtapaPet';
import { EtapaServico } from './EtapaServico';
import { EtapaDataHora } from './EtapaDataHora';
import { ResumoAgendamento } from './ResumoAgendamento';

export function FormularioAgendamento() {
  const [etapa, setEtapa] = useState(0);

  const methods = useForm<AgendamentoData>({
    resolver: zodResolver(agendamentoSchema),
    defaultValues: {
      pet: '',
      servico: '',
      data: '',
      hora: '',
    },
  });

  const nextStep = () => setEtapa(prev => prev + 1);
  const prevStep = () => setEtapa(prev => Math.max(prev - 1, 0));

  const onSubmit = (data: AgendamentoData) => {
    console.log('Dados do agendamento:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        {etapa === 0 && <EtapaPet onNext={nextStep} />}
        {etapa === 1 && <EtapaServico onNext={nextStep} onBack={prevStep} />}
        {etapa === 2 && <EtapaDataHora onNext={nextStep} onBack={prevStep} />}
        {etapa === 3 && (
          <ResumoAgendamento
            pet={methods.getValues('pet')}
            servico={methods.getValues('servico')}
            data={methods.getValues('data')}
            hora={methods.getValues('hora')}
            onBack={prevStep}
          />
        )}
      </form>
    </FormProvider>
  );
}
