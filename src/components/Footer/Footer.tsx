import { FooterLinks } from './FooterLinks';
import { FooterContact } from './FooterContact';
import { FooterSocial } from './FooterSocial';

export function Footer() {
  return (
    <footer className="bg-[#002B3D] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="./assets/img/logos/Logo_icon.png" alt="Toka dos Pets" className="h-16" />
            </div>
            <p className="text-blue-200">Cuidando com amor e expertise dos seus melhores amigos.</p>
          </div>
          <FooterLinks />
          <FooterContact />
          <FooterSocial />
        </div>
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
          © 2025 Toka dos Pets. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}