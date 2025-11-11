import { useEffect, useState } from 'react';
import { useAuth } from '@/context/useAuth';
import { buscarDadosDoTutor } from '@/services/Cliente/tutor-service';
import type { TutorDashboardData } from '@/types/tutor';

/**
 * Hook para buscar os dados principais do tutor autenticado.
 */
export function useClienteData() {
  const { user, token, isAuthenticated } = useAuth();

  const [dados, setDados] = useState<TutorDashboardData | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    // ainda usamos tutor_id só pra saber se esse usuário tem vínculo de tutor
    if (!user?.tutor_id || !token || !isAuthenticated) {
      setDados(null);
      setErro(null);
      setCarregando(false);
      return;
    }

    let cancelado = false;

    const carregarDados = async () => {
      setCarregando(true);
      setErro(null);

      try {
        // 🔹 agora o backend resolve o tutor via token (get_current_tutor)
        const cliente = await buscarDadosDoTutor(token);
        if (!cancelado) {
          setDados(cliente);
        }
      } catch (err) {
        console.error('[useClienteData] Erro ao carregar dados:', err);
        if (!cancelado) {
          setErro(err instanceof Error ? err.message : 'Erro desconhecido ao carregar dados.');
          setDados(null);
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    };

    carregarDados();

    return () => {
      cancelado = true;
    };
  }, [user?.tutor_id, token, isAuthenticated]);

  return { dados, carregando, erro };
}
