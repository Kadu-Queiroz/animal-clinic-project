import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/useAuth';
import { buscarExamesDetalhados } from '@/services/Tutor/tutor-service';
import type { ExameData } from '@/types/tutor';

type UseExamesMode = 'all' | 'latestByType';

interface UseExamesOptions {
  mode?: UseExamesMode; // default: 'all'
}

export function useExames(options?: UseExamesOptions) {
  const mode: UseExamesMode = options?.mode ?? 'all';
  const { token, isAuthenticated } = useAuth();

  const [rawExames, setRawExames] = useState<ExameData[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !isAuthenticated) {
      setRawExames([]);
      setErro(null);
      setCarregando(false);
      return;
    }

    let cancelado = false;

    (async () => {
      setCarregando(true);
      setErro(null);
      try {
        const data = await buscarExamesDetalhados(token);
        if (!cancelado) setRawExames(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('[useExames] Erro ao buscar exames:', err);
        if (!cancelado) {
          setErro('Não foi possível carregar seus exames.');
          setRawExames([]);
        }
      } finally {
        if (!cancelado) setCarregando(false);
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [token, isAuthenticated]);

  const exames = useMemo(() => {
    if (mode === 'latestByType') {
      return pickLatestByType(rawExames);
    }
    return rawExames;
  }, [rawExames, mode]);

  return { exames, carregando, erro };
}

/* ===== Helpers ===== */

function safeTs(d?: string | null): number | null {
  if (!d) return null;
  const t = new Date(d).getTime();
  return Number.isNaN(t) ? null : t;
}

/**
 * Retorna no máximo 2 exames: 1 de imagem + 1 laboratorial.
 * Se faltar timestamp, usa a ordem original da lista como fallback (primeiro vence).
 */
function pickLatestByType(exames: ExameData[]): ExameData[] {
  let img: { e: ExameData; ts: number | null; idx: number } | undefined;
  let lab: { e: ExameData; ts: number | null; idx: number } | undefined;

  exames.forEach((e, idx) => {
    const tipo = (e.tipo ?? '').toLowerCase();
    const ts = safeTs(e.data ?? e.data_realizacao ?? e.data_solicitacao);

    const preferirNovo = (atual?: { e: ExameData; ts: number | null; idx: number }) => {
      if (!atual) return true; // ainda não tem
      if (ts != null && atual.ts == null) return true; // novo tem data, atual não
      if (ts == null && atual.ts != null) return false; // atual tem data, novo não
      if (ts != null && atual.ts != null) return ts > atual.ts; // compara datas
      // ambos sem data: mantém o primeiro (ordem estável)
      return false;
    };

    if (tipo === 'imagem') {
      if (preferirNovo(img)) img = { e, ts, idx };
    } else if (tipo === 'laboratorial') {
      if (preferirNovo(lab)) lab = { e, ts, idx };
    }
  });

  return [img?.e, lab?.e].filter(Boolean) as ExameData[];
}
