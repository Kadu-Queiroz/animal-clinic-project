import { useEffect, useState } from 'react';
import { buscarExamesPorCpf } from '@/services/cliente';
import { useAuth } from '@context/useAuth';
import type { Exame } from '@/types/dados-exames';


export function useExames() {
  const { tutor } = useAuth();
  const [exames, setExames] = useState<Exame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tutor?.cpf) return;

    setLoading(true);
    buscarExamesPorCpf(tutor.cpf)
      .then(setExames)
      .catch((err) => {
        console.error(err);
        setError('Erro ao buscar exames');
      })
      .finally(() => setLoading(false));
  }, [tutor?.cpf]);

  return { exames, loading, error };
}