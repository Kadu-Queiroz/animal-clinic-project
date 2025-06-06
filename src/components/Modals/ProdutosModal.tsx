import { X } from 'lucide-react';
import { useModal } from '@/hooks/useModal';

const produtos = [
  {
    nome: 'Ração Premium para Cães',
    descricao: 'Ração de alta qualidade para cães adultos.',
    preco: 'R$ 120,00',
    imagem:
      'https://images.unsplash.com/photo-1591608511079-27a4b9f40c14?fit=crop&w=200&h=200&q=80',
  },
  {
    nome: 'Shampoo para Gatos',
    descricao: 'Shampoo suave para gatos de todos os tipos de pelagem.',
    preco: 'R$ 35,00',
    imagem:
      'https://images.unsplash.com/photo-1615796152238-9162035d92e4?fit=crop&w=200&h=200&q=80',
  },
  {
    nome: 'Brinquedo para Pássaros',
    descricao: 'Brinquedo interativo para pássaros de pequeno porte.',
    preco: 'R$ 25,00',
    imagem: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?fit=crop&w=200&h=200&q=80',
  },
];

export function ProdutosModal() {
  const { modal, closeModal } = useModal();
  if (modal !== 'produtos') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold text-[#002B3D]">Nossos Produtos</h2>
          <button onClick={closeModal} className="text-gray-600 hover:text-[#002B3D]">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="mb-6 text-gray-600">
            Confira nossa seleção de produtos de alta qualidade para o cuidado do seu pet.
          </p>

          <div className="space-y-4">
            {produtos.map((produto, index) => (
              <div key={index} className="flex items-center gap-4 border-b pb-4">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-[#002B3D]">{produto.nome}</h3>
                  <p className="text-sm text-gray-600">{produto.descricao}</p>
                  <p className="text-md font-bold text-[#002B3D]">{produto.preco}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t p-6">
          <button
            onClick={closeModal}
            className="w-full rounded-lg bg-[#002B3D] px-6 py-3 text-white transition hover:bg-blue-900"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
