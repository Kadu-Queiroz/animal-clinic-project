import { useEffect, useState } from 'react';
import { useAuth } from '@/context/useAuth';
import type { ExameData } from '@/types/tutor';
import { buscarExamesDetalhados } from '@/services/tutor';

export function useExames() {
  const { tutor } = useAuth();
  const [exames, setExames] = useState<ExameData[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarExames() {
      if (!tutor?.cpf) return;

      try {
        const resultado = await buscarExamesDetalhados(tutor.cpf);
        setExames(resultado);
      } catch (err) {
        console.error('[useExames] Erro ao buscar exames:', err);
        setErro('Não foi possível carregar os exames.');
      } finally {
        setCarregando(false);
      }
    }

    carregarExames();
  }, [tutor?.cpf]);

  return { exames, loading: carregando, error: erro };
}
