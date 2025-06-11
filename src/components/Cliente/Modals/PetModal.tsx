import { X } from 'lucide-react';
import { PetData } from '@/types/tutor';
import { ModalBase } from '@/components/shared/Modals/ModalBase';
import { calcularIdadePet } from '@/utils/calcularIdadePet';

interface PetModalProps {
  pet: PetData | null;
  onClose: () => void;
  aberto: boolean;
}

export function PetModal({ pet, onClose, aberto }: PetModalProps) {
  if (!pet) return null;

  const idadeCalculada = pet.data_nascimento
    ? calcularIdadePet(pet.data_nascimento)
    : 'Não informada';

  return (
    <ModalBase open={aberto} onClose={onClose}>
      <div className="mb-4 flex items-start justify-between">
        <h2 className="text-xl font-bold text-[#05334D]">Detalhes do Pet</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-red-500">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-2 text-[#05334D]">
        <p>
          <strong>Nome:</strong> {pet.nome}
        </p>
        <p>
          <strong>Espécie:</strong> {pet.especie}
        </p>
        <p>
          <strong>Raça:</strong> {pet.raca || 'Não informada'}
        </p>
        <p>
          <strong>Idade:</strong> {idadeCalculada}
        </p>
        <p>
          <strong>Peso:</strong> {pet.peso ? `${pet.peso} kg` : 'Não informado'}
        </p>
        <p>
          <strong>Cor:</strong> {pet.cor || 'Não informada'}
        </p>
        <p>
          <strong>Sexo:</strong> {pet.sexo || 'Não informado'}
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="rounded bg-[#CC6E28] px-4 py-2 text-sm text-white hover:bg-[#b55f22]"
        >
          Fechar
        </button>
      </div>
    </ModalBase>
  );
}
