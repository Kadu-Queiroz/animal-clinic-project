import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { agendamentoSchema } from '@/pages/Cliente/Agendar/schema';
import type { AgendamentoData } from '@/pages/Cliente/Agendar/schema';

import { EtapaPet } from './EtapaPet';
import { EtapaServico } from './EtapaServico';
import { EtapaDataHora } from './EtapaDataHora';
import { EtapaConfirmacao } from './EtapaConfirmacao';

import { agendarConsultaTutor } from '@/services/Cliente/tutor-service';

export function FormularioAgendamento() {
  const [etapa, setEtapa] = useState(0);
  const [loading, setLoading] = useState(false);

  const methods = useForm<AgendamentoData>({
    resolver: zodResolver(agendamentoSchema),
    defaultValues: { pet: '', servico: '', data: '', hora: '' },
    mode: 'onChange',
  });

  const nextStep = () => setEtapa(prev => Math.min(prev + 1, 3));
  const prevStep = () => setEtapa(prev => Math.max(prev - 1, 0));

  const onSubmit = async (data: AgendamentoData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Sessão expirada. Faça login novamente.');
        return;
      }

      const animalId = Number(data.pet);
      if (Number.isNaN(animalId)) {
        alert('Pet inválido.');
        return;
      }

      await agendarConsultaTutor(token, {
        animal_id: animalId,
        data: data.data, // YYYY-MM-DD
        hora: data.hora, // HH:MM:SS (mantido na EtapaDataHora)
        servico: data.servico,
      });

      alert('Consulta agendada com sucesso!');
      methods.reset();
      setEtapa(0);
    } catch (err) {
      console.error('[Agendar] erro:', err);
      alert('Erro ao agendar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {etapa === 0 && <EtapaPet onNext={nextStep} />}
        {etapa === 1 && <EtapaServico onNext={nextStep} onBack={prevStep} />}
        {etapa === 2 && <EtapaDataHora onNext={nextStep} onBack={prevStep} />}
        {etapa === 3 && <EtapaConfirmacao onBack={prevStep} loading={loading} />}
      </form>
    </FormProvider>
  );
}
