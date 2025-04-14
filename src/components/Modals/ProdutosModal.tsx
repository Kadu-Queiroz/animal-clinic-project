import { X } from "lucide-react";
import { useModalStore } from "@/hooks/useModalStore";

// Dados dos produtos com imagens reais do Unsplash
const produtos = [
  {
    nome: "Ração Premium para Cães",
    descricao: "Ração de alta qualidade para cães adultos.",
    preco: "R$ 120,00",
    imagem: "https://images.unsplash.com/photo-1591608511079-27a4b9f40c14?fit=crop&w=200&h=200&q=80",
  },
  {
    nome: "Shampoo para Gatos",
    descricao: "Shampoo suave para gatos de todos os tipos de pelagem.",
    preco: "R$ 35,00",
    imagem: "https://images.unsplash.com/photo-1615796152238-9162035d92e4?fit=crop&w=200&h=200&q=80",
  },
  {
    nome: "Brinquedo para Pássaros",
    descricao: "Brinquedo interativo para pássaros de pequeno porte.",
    preco: "R$ 25,00",
    imagem: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?fit=crop&w=200&h=200&q=80",
  },
];

export function ProdutosModal() {
  const { modal, closeModal } = useModalStore();
  if (modal !== "produtos") return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-[#002B3D]">Nossos Produtos</h2>
          <button onClick={closeModal} className="text-gray-600 hover:text-[#002B3D] transition">
            <X size={24} />
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Confira nossa seleção de produtos de alta qualidade para o cuidado do seu pet.
          </p>

          {/* Lista de Produtos */}
          <div className="space-y-4">
            {produtos.map((produto, index) => (
              <div key={index} className="flex items-center gap-4 border-b pb-4">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-[#002B3D]">{produto.nome}</h3>
                  <p className="text-gray-600">{produto.descricao}</p>
                  <p className="text-lg font-bold text-[#002B3D]">{produto.preco}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="p-6 border-t">
          <button
            onClick={closeModal}
            className="w-full bg-[#002B3D] text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}