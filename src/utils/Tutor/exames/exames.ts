import type { ExameData } from '@/types/tutor/exame_tutor';

export function normalizaTipo(raw?: string): 'imagem' | 'laboratorial' | 'outro' {
  const t = (raw ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  if (
    t.includes('imagem') ||
    t.includes('raio') ||
    t.includes('rx') ||
    t.includes('ultra') ||
    t.includes('tomografia')
  ) {
    return 'imagem';
  }
  if (
    t.includes('lab') ||
    t.includes('hemograma') ||
    t.includes('bioquim') ||
    t.includes('urin') ||
    t.includes('copro')
  ) {
    return 'laboratorial';
  }
  return 'outro';
}

function safeTs(d?: string | null): number {
  if (!d) return 0;
  const n = new Date(d).getTime();
  return Number.isNaN(n) ? 0 : n;
}

/**
 * Retorna no máximo 2 exames: o mais recente de IMAGEM e o mais recente LAB.
 * Se não houver timestamps, mantém o **primeiro** encontrado de cada tipo.
 * Se enabled=false, retorna a lista original sem filtro.
 */
export function pickLatestByType(exames: ExameData[], enabled = true): ExameData[] {
  if (!enabled) return exames;

  let img: ExameData | undefined;
  let lab: ExameData | undefined;

  for (const e of exames) {
    const tipo = normalizaTipo(e.tipo);
    const ts = safeTs(e.data ?? e.data_realizacao ?? e.data_solicitacao); // aceita arquivos “seedados” sem data

    if (tipo === 'imagem') {
      if (!img)
        img = e; // sem timestamp: fica o primeiro
      else if (ts > safeTs(img.data ?? img.data_realizacao ?? img.data_solicitacao)) img = e;
    } else if (tipo === 'laboratorial') {
      if (!lab) lab = e;
      else if (ts > safeTs(lab.data ?? lab.data_realizacao ?? lab.data_solicitacao)) lab = e;
    }
  }

  return [img, lab].filter(Boolean) as ExameData[];
}
