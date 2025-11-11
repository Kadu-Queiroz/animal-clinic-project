import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/useAuth';
import { buscarLembretesDoTutor } from '@/services/Cliente/tutor-service';
import type { LembreteData } from '@/types/tutor/lembrete_tutor';

export function useLembretes() {
  const { token, isAuthenticated } = useAuth();

  const [lembretes, setLembretes] = useState<LembreteData[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    // Sem sessão: zera estado e sai
    if (!token || !isAuthenticated) {
      setLembretes([]);
      setErro(null);
      setCarregando(false);
      return;
    }

    try {
      setCarregando(true);
      setErro(null);

      // Chama rota dedicada do cliente
      const data = await buscarLembretesDoTutor(token);
      setLembretes(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('[useLembretes] erro ao buscar lembretes', e);
      setErro('Não foi possível carregar seus lembretes.');
      setLembretes([]);
    } finally {
      setCarregando(false);
    }
  }, [token, isAuthenticated]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  const refetch = useCallback(() => {
    void carregar();
  }, [carregar]);

  // Derivados úteis para UI
  const hasLembretes = useMemo(() => lembretes.length > 0, [lembretes]);
  const vazio = useMemo(
    () => !carregando && !erro && lembretes.length === 0,
    [carregando, erro, lembretes],
  );

  return { lembretes, carregando, erro, vazio, hasLembretes, refetch };
}
