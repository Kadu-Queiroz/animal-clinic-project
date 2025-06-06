import { useEffect, useState } from 'react';
import { useAuth } from '@/context/useAuth';
import { buscarDadosDoTutor } from '@/services/tutor-service';
import type { TutorDashboardData } from '@/types/tutor';

export function useClienteData() {
  const { user, token } = useAuth();

  const [dados, setDados] = useState<TutorDashboardData | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      if (!user?.cpf || !token) return;

      try {
        const cliente = await buscarDadosDoTutor(user.cpf, token);
        setDados(cliente);
      } catch (err) {
        console.error('[useClienteData] Erro ao carregar dados:', err);
        setErro(err instanceof Error ? err.message : 'Erro desconhecido.');
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, [user, token]);

  return { dados, carregando, erro };
}
