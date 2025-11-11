import { useAuth } from '@/context/useAuth';
import { useCallback, useEffect, useState } from 'react';
import api from '@/lib/api';
import type { TutorDashboardData } from '@/types/tutor';
import type { ExameData } from '@/types/tutor/exame_tutor';
import { isFlagEnabled } from '@/config/featureFlags';

export function useDashboard() {
  const { token, isAuthenticated, user } = useAuth();
  const [dados, setDados] = useState<TutorDashboardData | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  const carregarDados = useCallback(async () => {
    if (!token || !isAuthenticated || !user?.cpf) {
      setDados(null);
      setErro(null);
      setCarregando(false);
      return;
    }

    setCarregando(true);
    setErro(null);

    try {
      // mantém a rota/headers originais
      const response = await api.get<TutorDashboardData>(`/cliente/dashboard?cpf=${user.cpf}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = response.data;

      // normalização leve para o front
      const examesNormalizados: ExameData[] = (json.exames ?? []).map(exame => ({
        id: exame.id,
        tipo: exame.tipo,
        status: exame.status,
        data_solicitacao: exame.data_solicitacao,
        data_realizacao: exame.data_realizacao,
        texto_ocr: exame.texto_ocr,
        arquivo: exame.arquivo,
        lido_tutor: exame.lido_tutor ?? false,
        pet: exame.pet,
        // campo auxiliar para ordenação/UX
        data: exame.data_realizacao ?? exame.data_solicitacao,
        status_legivel: mapStatus(exame.status),
      }));

      /**
       * Feature flag DEV: limita os exames do dashboard para no máximo 2
       * (1 de imagem + 1 laboratorial, os mais recentes).
       *
       * - Por padrão (DEFAULT_FLAGS), fica DESLIGADO, então não afeta produção.
       * - Pode ser ligado em runtime por querystring (?ff_dash_exames=1)
       *   ou localStorage (FF_DASH_LIMIT_EXAMES='true'), sem rebuild/docker.
       * - Mantemos no código porque é útil para testes/demos e não muda
       *   comportamento em prod enquanto o default for false.
       */
      const limitar = isFlagEnabled('DASH_LIMIT_EXAMES');
      const examesParaDashboard = pickLatestByType(examesNormalizados, limitar);

      setDados({ ...json, exames: examesParaDashboard });
    } catch (err) {
      console.error('[useDashboard] erro ao carregar dashboard:', err);
      setErro('Erro ao carregar dashboard');
    } finally {
      setCarregando(false);
    }
  }, [token, isAuthenticated, user?.cpf]);

  useEffect(() => {
    void carregarDados();
  }, [carregarDados]);

  // refetch para usar após agendar/remarcar
  const refetch = useCallback(() => {
    void carregarDados();
  }, [carregarDados]);

  return { dados, erro, carregando, refetch };
}

/* ===== Helpers ===== */

function mapStatus(status: string): 'disponivel' | 'analise' | 'coleta' {
  const s = (status || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  if (s.includes('disponivel')) return 'disponivel';
  if (s.includes('analise')) return 'analise';
  if (s.includes('coleta')) return 'coleta';
  return 'analise';
}

function ts(d?: string | null): number {
  if (!d) return 0;
  const n = new Date(d).getTime();
  return Number.isNaN(n) ? 0 : n;
}

/**
 * Quando `limitar` = true, retorna no máximo 2 exames:
 *   - o mais recente de imagem
 *   - o mais recente laboratorial
 * Caso `limitar` = false, retorna a lista como veio (sem filtro).
 */
function pickLatestByType(exames: ExameData[], limitar: boolean): ExameData[] {
  if (!limitar) return exames;

  let img: ExameData | undefined;
  let lab: ExameData | undefined;

  for (const e of exames) {
    const tipo = (e.tipo || '').toLowerCase();
    const when = ts(e.data ?? e.data_realizacao ?? e.data_solicitacao);

    if (tipo === 'imagem') {
      if (!img || when > ts(img.data ?? img.data_realizacao ?? img.data_solicitacao)) {
        img = e;
      }
    } else if (tipo === 'laboratorial') {
      if (!lab || when > ts(lab.data ?? lab.data_realizacao ?? lab.data_solicitacao)) {
        lab = e;
      }
    }
  }

  return [img, lab].filter(Boolean) as ExameData[];
}
