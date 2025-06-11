import { useEffect, useState } from 'react';
import { useAuth } from '@/context/useAuth';
import { TituloSecao } from '@/Intranet/components/ui/typography/TituloSecao';
import { ListaConsultasResumoVet } from '@/Intranet/Vet/components/ListaConsultasResumoVet';
import { getConsultasResumoVet } from '@/services/Intranet/vet-service';
import type { ConsultaResumoVet } from '@/types/intranet/consulta_intranet';

export function ConsultasVet() {
  const { token } = useAuth();
  const [consultas, setConsultas] = useState<ConsultaResumoVet[]>([]);

  useEffect(() => {
    if (!token) return;

    const carregar = async () => {
      try {
        const res = await getConsultasResumoVet(token);
        setConsultas(res);
      } catch (error) {
        console.error('Erro ao carregar consultas do veterinário:', error);
      }
    };

    carregar();
  }, [token]);

  return (
    <div className="p-4">
      <TituloSecao>Minhas Consultas</TituloSecao>
      <ListaConsultasResumoVet consultas={consultas} />
    </div>
  );
}
