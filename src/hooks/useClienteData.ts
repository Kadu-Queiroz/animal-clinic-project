import { useEffect, useState } from 'react';
import { useAuth } from '@context/useAuth';
import { buscarDadosDoCliente } from '@/services/cliente';
import type { ClienteData } from '@/types/dados-cliente';

export function useClienteData() {
  const { tutor } = useAuth();
  const [data, setData] = useState<ClienteData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tutor?.cpf) {
      setLoading(false);
      console.warn('[useClienteData] Nenhum CPF encontrado no contexto de autenticação.');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await buscarDadosDoCliente(tutor.cpf);
        setData(result);
      } catch (err) {
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