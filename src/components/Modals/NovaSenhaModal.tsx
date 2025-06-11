import { useState } from 'react';
import { alterarSenha } from '@/services/tutor-service';
import { useAuth } from '@/context/useAuth';

interface NovaSenhaModalProps {
  onFinalizar: () => void;
  obrigatorio?: boolean;
}

export function NovaSenhaModal({ onFinalizar }: NovaSenhaModalProps) {
  const { token, user, setUser } = useAuth();

  const [novaSenha, setNovaSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  const validarSenha = (senha: string): boolean => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,8}$/.test(senha);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarSenha(novaSenha)) {
      setErro('A senha deve conter de 6 a 8 caracteres, 1 maiúscula, 1 minúscula e 1 número.');
      return;
    }

    if (!token) {
      setErro('Token de autenticação não encontrado. Faça login novamente.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');
      await alterarSenha(novaSenha, token);

      if (user) {
        setUser({ ...user, senha_provisoria: false });
      }

      setSucesso('Senha alterada com sucesso!');
      setTimeout(onFinalizar, 1200);
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro desconhecido ao alterar senha.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-center text-xl font-semibold">Defina sua nova senha</h2>

        <form onSubmit={handleSubmit}>
          <label className="mb-2 block font-medium">Nova Senha</label>
          <input
            type="password"
            value={novaSenha}
            onChange={e => setNovaSenha(e.target.value)}
            className="mb-2 w-full rounded border p-2"
            placeholder="Ex: MinhaNova123"
            autoComplete="new-password"
          />

          <ul className="mb-4 list-disc pl-5 text-sm text-gray-600">
            <li>De 6 a 8 caracteres</li>
            <li>Ao menos 1 letra maiúscula</li>
            <li>Ao menos 1 letra minúscula</li>
            <li>Ao menos 1 número</li>
          </ul>

          {erro && <p className="mb-2 text-sm text-red-600">{erro}</p>}
          {sucesso && <p className="mb-2 text-sm text-green-600">{sucesso}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={carregando}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              {carregando ? 'Salvando...' : 'Salvar senha'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
