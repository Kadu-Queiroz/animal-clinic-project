import { useEffect, useState } from 'react';
import { useAuth } from '@/context/useAuth';
import { buscarExamesDetalhados } from '@/services/tutor-service';
import type { ExameData } from '@/types/tutor';

/**
 * Hook para buscar os exames do tutor autenticado.
 */
export function useExames() {
  const { user, token } = useAuth();

  const [exames, setExames] = useState<ExameData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.cpf || !token) return;

    const fetchExames = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await buscarExamesDetalhados(user.cpf, token);
        setExames(data);
      } catch (err) {
        console.error('[useExames] Erro ao buscar exames:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido.');
      } finally {
        setLoading(false);
      }
    };

    fetchExames();
  }, [user?.cpf, token]);

  return { exames, loading, error };
}
