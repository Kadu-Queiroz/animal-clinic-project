import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';
import { useModalStore } from '@/hooks/useModalStore';

export function LoginModal() {
  const { modal, closeModal } = useModalStore();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [cpf, setCpf] = useState('');
  const [pet, setPet] = useState('');
  const [erro, setErro] = useState('');

  if (modal !== 'loginCliente') return null;

  const formatarCpf = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, '').slice(0, 11);
    return apenasNumeros
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2');
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatarCpf(e.target.value));
  };

  const handleLogin = () => {
    const cpfValido = cpf.trim() === '123.456.789-00';
    const petValido = pet.trim().toLowerCase() === 'rex';

    if (cpfValido && petValido) {
      login({ nome: 'Maria Silva', cpf });
      setErro('');
      closeModal();
      navigate('/cliente/dashboard');
    } else {
      setErro('CPF ou nome do pet incorretos');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-center text-xl font-semibold">Área do Cliente</h2>

        <label className="mb-2 block font-medium">CPF do Tutor</label>
        <input
          type="text"
          value={cpf}
          onChange={handleCpfChange}
          onKeyDown={handleKeyPress}
          placeholder="Ex: 123.456.789-00"
          className="mb-4 w-full rounded border p-2"
          inputMode="numeric"
        />

        <label className="mb-2 block font-medium">Nome do Pet</label>
        <input
          type="text"
          value={pet}
          onChange={e => setPet(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ex: Rex"
          className="mb-2 w-full rounded border p-2"
        />

        {erro && <p className="mb-4 text-sm text-red-600">{erro}</p>}

        <div className="flex justify-between">
          <button className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400" onClick={closeModal}>
            Cancelar
          </button>
          <button
            className="rounded bg-[#002B3D] px-4 py-2 text-white hover:bg-[#D96E30]"
            onClick={handleLogin}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
