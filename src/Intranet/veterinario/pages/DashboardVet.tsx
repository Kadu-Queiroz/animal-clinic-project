import { useEffect, useState } from 'react';
import { useAuth } from '@/context/useAuth';
import { CardResumo } from '@/Intranet/Vet/components/CardResumo';
import { getConsultasVet, getExamesVet, getPacientesVet } from '@/services/Intranet/vet-service';

import type { ConsultaAgendaVet } from '@/types/intranet/consulta_intranet';
import type { ExameVet } from '@/types/intranet/exame_intranet';
import type { PacienteVet } from '@/types/intranet/paciente_intranet';

export function DashboardVet() {
  const { user, token } = useAuth();
  const [consultas, setConsultas] = useState<ConsultaAgendaVet[]>([]);
  const [exames, setExames] = useState<ExameVet[]>([]);
  const [pacientes, setPacientes] = useState<PacienteVet[]>([]);

  useEffect(() => {
    if (!user || !token) return;

    const carregarDados = async () => {
      try {
        const [resConsultas, resExames, resPacientes] = await Promise.all([
          getConsultasVet(token),
          getExamesVet(token),
          getPacientesVet(token),
        ]);

        setConsultas(resConsultas);
        setExames(resExames);
        setPacientes(resPacientes);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard do veterinário:', error);
      }
    };

    carregarDados();
  }, [user, token]);

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
      <CardResumo titulo="Consultas" quantidade={consultas.length} cor="blue" />
      <CardResumo titulo="Exames" quantidade={exames.length} cor="green" />
      <CardResumo titulo="Pacientes" quantidade={pacientes.length} cor="purple" />
    </div>
  );
}
