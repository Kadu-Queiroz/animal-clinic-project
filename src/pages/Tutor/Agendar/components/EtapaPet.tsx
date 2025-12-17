import { useFormContext } from 'react-hook-form';
import { useAnimaisDoTutor } from '@/hooks/Tutor/useAnimaisDoTutor';
import type { AgendamentoData } from '@/pages/Tutor/Agendar/schema';

interface EtapaPetProps {
  onNext: () => void;
}

export function EtapaPet({ onNext }: EtapaPetProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<AgendamentoData>();
  const { animais, carregando, erro } = useAnimaisDoTutor();
  const petSelecionado = watch('pet');

  return (
    <div className="rounded bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-[#05334D]">Escolha o Pet</h2>

      {/* Estado de carregamento */}
      {carregando && <p className="text-[#05334D]">Carregando seus pets...</p>}

      {/* Erro */}
      {erro && (
        <p className="text-red-600">Não foi possível carregar seus pets. Tente novamente.</p>
      )}

      {/* Nenhum pet */}
      {!carregando && !erro && animais.length === 0 && (
        <p className="text-[#8B947F]">
          Nenhum pet encontrado. Procure a clínica para cadastrar um.
        </p>
      )}

      {/* Lista de pets */}
      {!carregando && !erro && animais.length > 0 && (
        <>
          <select
            {...register('pet', { required: 'Selecione um pet antes de continuar.' })}
            defaultValue=""
            className="w-full rounded border border-gray-300 p-2"
          >
            <option value="" disabled>
              Selecione um pet
            </option>
            {animais.map(pet => (
              <option key={pet.id} value={pet.id}>
                {pet.nome} ({pet.especie})
              </option>
            ))}
          </select>

          {errors.pet && (
            <p className="mt-1 text-sm text-red-600">{errors.pet.message as string}</p>
          )}
        </>
      )}

      {/* Botão próximo */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!petSelecionado}
          className={`rounded px-6 py-2 text-white transition ${
            petSelecionado ? 'bg-[#CC6E28] hover:bg-[#b55f22]' : 'cursor-not-allowed bg-gray-400'
          }`}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
