interface TituloSecaoProps {
  children: React.ReactNode;
  className?: string;
}

export function TituloSecao({ children, className = '' }: TituloSecaoProps) {
  return <h2 className={`mb-4 text-xl font-semibold text-gray-700 ${className}`}>{children}</h2>;
}
