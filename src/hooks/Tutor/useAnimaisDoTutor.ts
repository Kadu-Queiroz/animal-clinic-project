import { useEffect, useState } from 'react';
import { buscarAnimaisDoTutor } from '@/lib/Tutor/api-animais';
import { useAuth } from '@/context/useAuth';
import type { PetData } from '@/types/tutor';

export function useAnimaisDoTutor() {
  const { token, isAuthenticated } = useAuth();
  const [animais, setAnimais] = useState<PetData[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !isAuthenticated) {
      setAnimais([]);
      setCarregando(false);
      setErro(null);
      return;
    }

    let cancelado = false;

    const carregar = async () => {
      setCarregando(true);
      setErro(null);

      try {
        const dados = await buscarAnimaisDoTutor(token);
        if (!cancelado) setAnimais(dados);
      } catch (e) {
        if (!cancelado) {
          setErro(e instanceof Error ? e.message : 'Erro desconhecido');
          setAnimais([]);
        }
      } finally {
        if (!cancelado) setCarregando(false);
      }
    };

    carregar();

    return () => {
      cancelado = true;
    };
  }, [token, isAuthenticated]);

  return { animais, carregando, erro };
}
