import { useEffect, useState } from 'react';
import { buscarAnimaisDoTutor } from '@/lib/api-animais';
import { useAuth } from '@/context/useAuth';
import type { PetData } from '@/types/tutor/';

export function useAnimaisDoTutor() {
  const { token } = useAuth();
  const [animais, setAnimais] = useState<PetData[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    buscarAnimaisDoTutor(token)
      .then(setAnimais)
      .catch(e => setErro(e.message || 'Erro desconhecido'))
      .finally(() => setCarregando(false));
  }, [token]);

  return { animais, carregando, erro };
}
