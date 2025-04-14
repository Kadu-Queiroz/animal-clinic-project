import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/hooks/useModalStore';

export function LoginModal() {
  const { modal, closeModal } = useModalStore();
  const navigate = useNavigate();

  const [cpf, setCpf] = useState('');
  const [pet, setPet] = useState('');
  const [erro, setErro] = useState('');

  if (modal !== 'loginCliente') return null;

  const handleLogin = () => {
    const cpfValido = cpf.trim() === '123.456.789-00';
    const petValido = pet.trim().toLowerCase() === 'rex';

    if (cpfValido && petValido) {
      setErro('');
      closeModal();
      navigate('/cliente/dashboard');
    } else {
      setErro('CPF ou nome do pet incorretos');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Área do Cliente</h2>

        <label className="block mb-2 font-medium">CPF do Tutor</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="Ex: 123.456.789-00"
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2 font-medium">Nome do Pet</label>
        <input
          type="text"
          value={pet}
          onChange={(e) => setPet(e.target.value)}
          placeholder="Ex: Rex"
          className="w-full p-2 mb-2 border rounded"
        />

        {erro && <p className="text-red-600 text-sm mb-4">{erro}</p>}

        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={closeModal}
          >
            Cancelar
          </button>

          <button
            className="px-4 py-2 bg-[#002B3D] text-white rounded hover:bg-[#D96E30]"
            onClick={handleLogin}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}