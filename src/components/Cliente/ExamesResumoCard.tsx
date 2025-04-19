import { useNavigate, useLocation } from 'react-router-dom';

interface ExamesResumoCardProps {
  count: number;
}

export function ExamesResumoCard({ count }: ExamesResumoCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const texto = count === 1 ? '1 exame' : `${count} exames`;

  const estaNaPaginaDeExames = location.pathname.includes('/cliente/exames');

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg">
      <div className="flex flex-col items-center p-6 text-center">
        <h2 className="mb-2 text-lg font-semibold text-[#05334D]">
          {estaNaPaginaDeExames ? (
            <button
              onClick={() => navigate('/cliente/dashboard')}
              className="mb-2 flex items-center text-sm text-[#05334D] hover:underline"
            >
              ← Voltar para o Dashboard
            </button>
          ) : (
            'Resultados Pendentes'
          )}
        </h2>

        {!estaNaPaginaDeExames && (
          <>
            <span className="mb-4 rounded-full bg-[#8B947F] px-4 py-1 text-sm text-white">
              {texto}
            </span>

            <button
              onClick={() => navigate('/cliente/exames')}
              className="w-full rounded bg-[#05334D] px-4 py-2 text-white transition hover:bg-[#042736]"
            >
              Ver Exames
            </button>
          </>
        )}
      </div>
    </div>
  );
}
