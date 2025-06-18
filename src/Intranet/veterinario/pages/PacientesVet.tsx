import { useEffect, useState } from 'react';
import { useAuth } from '@/context/useAuth';
import { getPacientesVet } from '@/services/Intranet/vet-service';
import type { PacienteVet } from '@/types/intranet/paciente_intranet';
import { ListaPacientesVet } from '@/Intranet/Vet/components/ListaPacientesVet';
import { PacienteDetalheModal } from '@/Intranet/Vet/components/modais/PacienteDetalheModal';

export function PacientesVet() {
  const { token, isAuthenticated } = useAuth();
  const [pacientes, setPacientes] = useState<PacienteVet[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<PacienteVet | null>(null);

  useEffect(() => {
    if (!token || !isAuthenticated) return;

    getPacientesVet(token)
      .then(setPacientes)
      .catch(() => setErro('Erro ao carregar pacientes.'));
  }, [token, isAuthenticated]);

  const abrirModal = (paciente: PacienteVet) => {
    setPacienteSelecionado(paciente);
    setModalAberto(true);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-semibold">Pacientes sob cuidado</h2>

      {erro && <p className="text-red-500">{erro}</p>}
      {!pacientes && !erro && <p>Carregando pacientes...</p>}
      {pacientes && <ListaPacientesVet pacientes={pacientes} onSelecionar={abrirModal} />}

      {pacienteSelecionado && (
        <PacienteDetalheModal
          aberto={modalAberto}
          paciente={pacienteSelecionado}
          onFechar={() => setModalAberto(false)}
        />
      )}
    </div>
  );
}
