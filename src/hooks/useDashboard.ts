import { useAuth } from '@/context/useAuth';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { TutorDashboardData } from '@/types/tutor';

export function useDashboard() {
  const { token, isAuthenticated, user } = useAuth();
  const [dados, setDados] = useState<TutorDashboardData | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!token || !isAuthenticated || !user?.cpf) {
      setDados(null);
      setErro(null);
      setCarregando(false);
      return;
    }

    const carregarDados = async () => {
      setCarregando(true);
      setErro(null);

      try {
        const response = await api.get(`/cliente/dashboard?cpf=${user.cpf}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(response.data);
      } catch (err) {
        setErro('Erro ao carregar dashboard');
        console.error(err);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, [token, isAuthenticated, user?.cpf]);

  return { dados, erro, carregando };
}
