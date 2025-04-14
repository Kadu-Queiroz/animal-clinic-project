import { useEffect, useState } from 'react';
import { useAuth } from '@context/useAuth';
import { buscarDadosDoCliente } from '@services/cliente';
import type { ClienteData } from '@/types/dados-cliente';

export function useClienteData() {
  const { tutor } = useAuth();
  const [data, setData] = useState<ClienteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tutor?.cpf) return;

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const result = await buscarDadosDoCliente(tutor.cpf);
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('[useClienteData]', err.message);
          setError(err.message);
        } else {
          console.error('[useClienteData] Erro inesperado:', err);
          setError('Ocorreu um erro desconhecido.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tutor?.cpf]);

  return { data, loading, error };
}