import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { agendamentoSchema } from '@/pages/Tutor/Agendar/schema';
import type { AgendamentoData } from '@/pages/Tutor/Agendar/schema';

import { EtapaPet } from './EtapaPet';
import { EtapaServico } from './EtapaServico';
import { EtapaDataHora } from './EtapaDataHora';
import { EtapaConfirmacao } from './EtapaConfirmacao';

import { agendarConsultaTutor } from '@/services/Tutor/tutor-service';

const VETERINARIO_ID_FIXO = 1;

export function FormularioAgendamento() {
  const [etapa, setEtapa] = useState(0);
  const [loading, setLoading] = useState(false);

  const methods = useForm<AgendamentoData>({
    resolver: zodResolver(agendamentoSchema),
    defaultValues: {
      pet: '',
      servico: '',
      data: '',
      slot_start_at: '',
      slot_end_at: '',
    },
    mode: 'onChange',
    shouldUnregister: false, // importante em wizard (mantém valores mesmo desmontando etapa)
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
      if (Number.isNaN(animalId) || animalId <= 0) {
        alert('Pet inválido.');
        return;
      }

      if (!data.slot_start_at || !data.slot_end_at) {
        alert('Selecione um horário antes de confirmar.');
        return;
      }

      await agendarConsultaTutor(token, {
        animal_id: animalId,
        veterinario_id: VETERINARIO_ID_FIXO,
        start_at: data.slot_start_at,
        end_at: data.slot_end_at,
        procedimento: data.servico,
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

  const { handleSubmit, register } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Garante que RHF conhece esses campos (evita undefined no submit) */}
        <input type="hidden" {...register('pet')} />
        <input type="hidden" {...register('servico')} />
        <input type="hidden" {...register('data')} />
        <input type="hidden" {...register('slot_start_at')} />
        <input type="hidden" {...register('slot_end_at')} />

        {etapa === 0 && <EtapaPet onNext={nextStep} />}
        {etapa === 1 && <EtapaServico onNext={nextStep} onBack={prevStep} />}
        {etapa === 2 && <EtapaDataHora onNext={nextStep} onBack={prevStep} />}
        {etapa === 3 && <EtapaConfirmacao onBack={prevStep} loading={loading} />}
      </form>
    </FormProvider>
  );
}
