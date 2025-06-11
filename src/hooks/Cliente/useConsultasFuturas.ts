import { useEffect, useState } from 'react';
import { useAuth } from '@/context/useAuth';
import api from '@/lib/api';
import type { ConsultaResumoTutor } from '@/types/tutor/';

export function useConsultasFuturas() {
  const { token, isAuthenticated, user } = useAuth();

  const [consultas, setConsultas] = useState<ConsultaResumoTutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !isAuthenticated || !user?.cpf) {
      setConsultas([]);
      setErro(null);
      setLoading(false);
      return;
    }

    let cancelado = false;

    const carregar = async () => {
      setLoading(true);
      setErro(null);

      try {
        const res = await api.get<ConsultaResumoTutor[]>(`/cliente/consultas?cpf=${user.cpf}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!cancelado) {
          setConsultas(res.data);
        }
      } catch (err: unknown) {
        if (!cancelado) {
          if (err instanceof Error) {
            setErro(err.message);
          } else {
            setErro('Erro ao carregar consultas futuras.');
          }
          setConsultas([]);
        }
      } finally {
        if (!cancelado) {
          setLoading(false);
        }
      }
    };

    carregar();

    return () => {
      cancelado = true;
    };
  }, [token, isAuthenticated, user?.cpf]);

  return { consultas, loading, erro };
}
