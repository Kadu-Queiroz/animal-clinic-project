import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

import { useAuth } from '@/context/useAuth';
import { useModal } from '@/hooks/shared/useModal';
import { NovaSenhaModal } from '@/components/shared/Modals/NovaSenhaModal';

export function LoginModal() {
  const { modal, closeModal } = useModal();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mostrarNovaSenhaModal, setMostrarNovaSenhaModal] = useState(false);

  if (modal !== 'loginCliente') return null;

  const formatarCpf = (valor: string) =>
    valor
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      const res = await login({ cpf, password: senha });

      if (res?.senha_provisoria) {
        setMostrarNovaSenhaModal(true);
        return;
      }

      closeModal();
      navigate('/cliente/dashboard');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro desconhecido ao realizar login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      {mostrarNovaSenhaModal ? (
        <NovaSenhaModal
          onFinalizar={() => {
            setMostrarNovaSenhaModal(false);
            closeModal();
            navigate('/cliente/dashboard');
          }}
        />
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-[#002B3D]"
            >
              <X size={20} />
            </button>

            <h2 className="mb-4 text-center text-xl font-semibold text-[#002B3D]">
              Área do Cliente
            </h2>

            <form onSubmit={handleSubmit}>
              <label className="mb-2 block font-medium">CPF do Tutor</label>
              <input
                type="text"
                value={cpf}
                onChange={e => setCpf(formatarCpf(e.target.value))}
                placeholder="Ex: 123.456.789-00"
                inputMode="numeric"
                autoComplete="username"
                className="mb-4 w-full rounded border p-2"
              />

              <label className="mb-2 block font-medium">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                placeholder="Ex: rex123"
                autoComplete="current-password"
                className="mb-4 w-full rounded border p-2"
              />

              {erro && <p className="mb-4 text-sm text-red-600">{erro}</p>}

              <div className="flex justify-between">
                <button
                  type="button"
                  className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                  onClick={closeModal}
                  disabled={carregando}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded bg-[#002B3D] px-4 py-2 text-white hover:bg-[#D96E30]"
                  disabled={carregando}
                >
                  {carregando ? 'Entrando...' : 'Entrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
