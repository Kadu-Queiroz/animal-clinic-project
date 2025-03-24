import { FooterLinks } from './FooterLinks';
import { FooterContact } from './FooterContact';
import { FooterSocial } from './FooterSocial';
import logoIconColorido from '@assets/img/logos/logo_icon_colorido_corte_maior_Stroke.webp';

export function Footer() {
  return (
    <footer className="bg-[#002B3D] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Coluna do Logo */}
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logoIconColorido}
                alt="Toka dos Pets"
                className="h-20 md:h-26 lg:h-40 w-auto max-h-56"
              />
            </div>
            <p className="text-blue-200">Cuidando com amor e expertise dos seus melhores amigos.</p>
          </div>

          {/* Outras Colunas */}
          <FooterLinks />
          <FooterContact />
          <FooterSocial />
        </div>

        {/* Rodapé Inferior */}
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
          © 2025 Toka dos Pets. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}