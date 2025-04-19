import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VoltarButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

export function VoltarButton({ to, label = 'Voltar', className = '' }: VoltarButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 rounded bg-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#05334D] shadow transition hover:bg-[#d6d6d6] ${className}`}
    >
      <ArrowLeft size={20} className="text-[#05334D]" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
