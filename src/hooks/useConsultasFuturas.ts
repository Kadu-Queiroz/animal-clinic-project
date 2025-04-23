import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";

export interface ConsultaFutura {
  id: number;
  pet: string;
  data_hora: string;
  status: string;
  veterinario_nome: string;
}

export function useConsultasFuturas(cpf: string) {
  const [consultas, setConsultas] = useState<ConsultaFutura[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!cpf) return;

    const carregar = async () => {
      try {
        const res = await axios.get<ConsultaFutura[]>(`/cliente/consultas?cpf=${cpf}`);
        setConsultas(res.data);
      } catch (err: unknown) {
        if (isAxiosError(err) && err.response) {
          setErro(err.response.data?.detail || "Erro na API.");
        } else {
          setErro("Erro inesperado ao buscar consultas.");
        }
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, [cpf]);

  return { consultas, loading, erro };
}