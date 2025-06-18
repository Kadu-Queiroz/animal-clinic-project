import type { PacienteVet } from '@/types/intranet/paciente_intranet';

interface ListaPacientesVetProps {
  pacientes: PacienteVet[];
  onSelecionar: (paciente: PacienteVet) => void;
}

export function ListaPacientesVet({ pacientes, onSelecionar }: ListaPacientesVetProps) {
  if (pacientes.length === 0) {
    return <p className="text-gray-500">Nenhum paciente encontrado.</p>;
  }

  return (
    <ul className="space-y-3">
      {pacientes.map(p => (
        <li
          key={p.id}
          className="cursor-pointer rounded border border-gray-200 p-4 transition hover:bg-gray-50"
          onClick={() => onSelecionar(p)}
        >
          <h3 className="text-lg font-semibold">{p.nome}</h3>
          <p className="text-sm text-gray-600">
            {p.especie} — {p.raca} | Idade: {p.idade || 'N/A'}
          </p>
        </li>
      ))}
    </ul>
  );
}
