import { useEffect, useState } from 'react';
import type { TutorData } from '@/types/tutor';
import { buscarDadosDoTutor } from '@/services/tutor';

export function useClienteData(cpf: string = '123.456.789-00') {
  const [dados, setDados] = useState<TutorData | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDados() {
      console.log('[useClienteData] Iniciando busca para CPF:', cpf);
      try {
        const cliente = await buscarDadosDoTutor(cpf);
        console.log('[useClienteData] Dados recebidos:', cliente);

        setDados(cliente);
      } catch (err) {
        console.error('[useClienteData] Erro ao carregar dados:', err);
        setErro('Erro ao carregar dados do cliente.');
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [cpf]);

  return { dados, carregando, erro };
}
