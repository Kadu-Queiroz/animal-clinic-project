import { useEffect, useState } from 'react';
import type { ExameData } from '@/types/dados-cliente';
import { buscarExamesDetalhadosPorCpf } from '@/services/cliente';

export function useExames(cpf: string = '123.456.789-00') {
  const [dados, setDados] = useState<ExameData[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExames() {
      try {
        const resultado = await buscarExamesDetalhadosPorCpf(cpf);
        setDados(resultado);
      } catch (err) {
        console.error('[useExames] Erro ao buscar exames:', err);
        setErro('Não foi possível carregar os exames.');
      } finally {
        setCarregando(false);
      }
    }

    fetchExames();
  }, [cpf]);

  return { exames: dados, loading: carregando, error: erro };
}