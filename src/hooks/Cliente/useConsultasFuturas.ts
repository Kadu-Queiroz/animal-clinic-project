import { useEffect, useState } from 'react';
import { useAuth } from '@/context/useAuth';
import { buscarConsultasDoTutor } from '@/services/Cliente/tutor-service';
import type { ConsultaResumoTutor } from '@/types/tutor/';

export function useConsultasFuturas() {
  const { token, isAuthenticated } = useAuth();

  const [consultas, setConsultas] = useState<ConsultaResumoTutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !isAuthenticated) {
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
        const data = await buscarConsultasDoTutor(token); // só token
        if (!cancelado) {
          setConsultas(data);
        }
      } catch (err: unknown) {
        console.error('[useConsultasFuturas] Erro ao carregar consultas futuras:', err);
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
  }, [token, isAuthenticated]);

  return { consultas, loading, erro };
}
