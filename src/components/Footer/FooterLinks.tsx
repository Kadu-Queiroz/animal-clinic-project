export function FooterLinks() {
    return (
      <div>
        <h3 className="font-bold mb-4">Links Rápidos</h3>
        <ul className="space-y-2">
          <li>
            <a href="#inicio" className="text-blue-200 hover:text-white transition">Início</a>
          </li>
          <li>
            <a href="#sobre" className="text-blue-200 hover:text-white transition">Sobre Nós</a>
          </li>
          <li>
            <a href="#servicos" className="text-blue-200 hover:text-white transition">Serviços</a>
          </li>
          <li>
            <a href="#galeria" className="text-blue-200 hover:text-white transition">Galeria</a>
          </li>
          <li>
            <a href="#contato" className="text-blue-200 hover:text-white transition">Contato</a>
          </li>
        </ul>
      </div>
    );
  }