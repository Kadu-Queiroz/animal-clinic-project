import { useAuth } from '@/context/useAuth';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { TutorDashboardData } from '@/types/tutor';
import type { ExameData } from '@/types/tutor/exame_tutor';

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
        const response = await api.get<TutorDashboardData>(`/cliente/dashboard?cpf=${user.cpf}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = response.data;

        const examesAdaptados: ExameData[] = (json.exames ?? []).map(exame => ({
          id: exame.id,
          tipo: exame.tipo,
          status: exame.status,
          data_solicitacao: exame.data_solicitacao,
          data_realizacao: exame.data_realizacao,
          texto_ocr: exame.texto_ocr,
          arquivo: exame.arquivo,
          lido_tutor: exame.lido_tutor ?? false,
          pet: exame.pet,
          data: exame.data_realizacao ?? exame.data_solicitacao,
          status_legivel: mapStatus(exame.status),
        }));

        setDados({ ...json, exames: examesAdaptados });
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

// 🔤 Normaliza o status para os valores esperados pelo frontend
function mapStatus(status: string): 'disponivel' | 'analise' | 'coleta' {
  const s = status
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  if (s.includes('disponivel')) return 'disponivel';
  if (s.includes('analise')) return 'analise';
  if (s.includes('coleta')) return 'coleta';
  return 'analise'; // fallback seguro
}
