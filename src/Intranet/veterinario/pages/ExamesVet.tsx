import { useEffect, useState } from 'react';
import { getExamesVet } from '@/services/Intranet/vet-service';
import { useAuth } from '@/context/useAuth';
import { ExameVet } from '@/types/intranet/exame_intranet';
import { ListaExamesVet } from '@/Intranet/Vet/components/ListaExamesVet';
import { ExameDetalheModal } from '@/Intranet/Vet/components/modais/ExameDetalheModal';

export function ExamesVet() {
  const { token, isAuthenticated } = useAuth();
  const [exames, setExames] = useState<ExameVet[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [exameSelecionado, setExameSelecionado] = useState<ExameVet | null>(null);

  useEffect(() => {
    if (!token || !isAuthenticated) return;

    getExamesVet(token)
      .then(data => setExames(data))
      .catch(err => {
        console.error('Erro ao buscar exames:', err);
        setErro('Não foi possível carregar os exames.');
      });
  }, [token, isAuthenticated]);

  const abrirModal = (exame: ExameVet) => {
    setExameSelecionado(exame);
    setModalAberto(true);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-semibold">Exames do Veterinário</h2>

      {erro && <p className="text-red-500">{erro}</p>}
      {!exames && !erro && <p>Carregando exames...</p>}
      {exames && <ListaExamesVet exames={exames} onSelecionar={abrirModal} />}

      {exameSelecionado && (
        <ExameDetalheModal
          aberto={modalAberto}
          exame={exameSelecionado}
          onFechar={() => setModalAberto(false)}
        />
      )}
    </div>
  );
}
