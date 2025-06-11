import { useState } from 'react';
import { useAuth } from '@/context/useAuth';

interface LoginFuncionarioModalProps {
  onClose: () => void;
}

export function LoginFuncionarioModal({ onClose }: LoginFuncionarioModalProps) {
  const { login } = useAuth();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setErro(null);
    try {
      await login({ cpf, password: senha });
      onClose();
    } catch {
      setErro('Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-xl font-bold">Login da Intranet</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-700">CPF</label>
          <input
            type="text"
            className="w-full rounded border p-2"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            placeholder="Digite seu CPF"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700">Senha</label>
          <input
            type="password"
            className="w-full rounded border p-2"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>

        {erro && <p className="mb-2 text-sm text-red-600">{erro}</p>}

        <button
          onClick={handleLogin}
          className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </div>
    </div>
  );
}
