import { useEffect, useState } from 'react';
import { ClienteData } from '@/types/dados-cliente';
import { buscarDadosDoCliente, buscarExamesDetalhadosPorCpf } from '@/services/cliente';

export function useClienteData(cpf: string = '123.456.789-00') {
  const [dados, setDados] = useState<ClienteData | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [cliente, exames] = await Promise.all([
          buscarDadosDoCliente(cpf),
          buscarExamesDetalhadosPorCpf(cpf),
        ]);

        setDados({
          ...cliente,
          exames,
        });
      } catch (error) {
        console.error('Erro ao carregar dados do cliente:', error);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [cpf]);

  return { dados, carregando };
}