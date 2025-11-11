type FlagName = 'DASH_LIMIT_EXAMES';

const DEFAULT_FLAGS: Record<FlagName, boolean> = {
  DASH_LIMIT_EXAMES: false, // default: mostra todos os exames no dashboard
};

// l33t: ?ff_dash_exames=1 ativa só nessa navegação
function fromQuery(): Partial<Record<FlagName, boolean>> {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  const out: Partial<Record<FlagName, boolean>> = {};
  if (p.get('ff_dash_exames') != null) {
    out.DASH_LIMIT_EXAMES = p.get('ff_dash_exames') === '1';
  }
  return out;
}

// Persistente: localStorage.setItem('FF_DASH_LIMIT_EXAMES', 'true' | 'false')
function fromLocalStorage(): Partial<Record<FlagName, boolean>> {
  if (typeof window === 'undefined') return {};
  const v = window.localStorage.getItem('FF_DASH_LIMIT_EXAMES');
  return v == null ? {} : { DASH_LIMIT_EXAMES: v === 'true' };
}

export function isFlagEnabled(name: FlagName): boolean {
  const query = fromQuery();
  if (name in query) return !!query[name as keyof typeof query];

  const ls = fromLocalStorage();
  if (name in ls) return !!ls[name as keyof typeof ls];

  return DEFAULT_FLAGS[name];
}

// Helper opcional pra mudar em runtime (dev tools / console)
export function setFlag(name: FlagName, val: boolean) {
  if (name === 'DASH_LIMIT_EXAMES') {
    window.localStorage.setItem('FF_DASH_LIMIT_EXAMES', String(val));
  }
}
