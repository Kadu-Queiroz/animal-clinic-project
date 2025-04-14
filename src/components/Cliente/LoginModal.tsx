import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/hooks/useModalStore';

export function LoginModal() {
  const { modal, closeModal } = useModalStore();
  const navigate = useNavigate();
  const [cpf, setCpf] = useState('');
  const [pet, setPet] = useState('');

  if (modal !== 'loginCliente') return null;

  const handleLogin = () => {
    // futura integração: validar com backend
    if (cpf.trim() && pet.trim()) {
      closeModal();
      navigate('/cliente/dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-center text-[#002B3D]">
          Área do Cliente
        </h2>

        <label className="block mb-2 font-medium text-[#002B3D]">CPF do Tutor</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="Ex: 123.456.789-00"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#D96E30]"
        />

        <label className="block mb-2 font-medium text-[#002B3D]">Nome do Pet</label>
        <input
          type="text"
          value={pet}
          onChange={(e) => setPet(e.target.value)}
          placeholder="Ex: Rex"
          className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-[#D96E30]"
        />

        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-gray-300 text-[#002B3D] rounded hover:bg-gray-400 transition"
            onClick={closeModal}
          >
            Cancelar
          </button>

          <button
            className="px-4 py-2 bg-[#002B3D] text-white rounded hover:bg-[#D96E30] transition"
            onClick={handleLogin}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}