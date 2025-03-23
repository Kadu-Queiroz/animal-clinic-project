import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-[#002B3D] flex-shrink-0" />
            <div>
              <h3 className="font-bold mb-1">Endereço</h3>
              <p className="text-gray-600">Rua Cerro Corá, 569/577, Alto Pinheiros, São Paulo</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-[#002B3D] flex-shrink-0" />
            <div>
              <h3 className="font-bold mb-1">Telefones</h3>
              <p className="text-gray-600">(11) 3205-2390 | (11) 96355-1131</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-[#002B3D] flex-shrink-0" />
            <div>
              <h3 className="font-bold mb-1">E-mail</h3>
              <p className="text-gray-600">contato@tokadospets.com.br</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-[#002B3D] flex-shrink-0" />
            <div>
              <h3 className="font-bold mb-1">Horário de Funcionamento</h3>
              <p className="text-gray-600">Seg - Sáb: 8:00 am – 20:00 pm</p>
              <p className="text-gray-600">Domingo: Fechado</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-[#002B3D]">Redes Sociais</h3>
        <div className="flex gap-4">
          <a href="https://www.facebook.com/tokadospetsoficial" className="bg-[#002B3D] text-white p-3 rounded-full hover:bg-blue-900 transition">
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/tokadospetsoficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            className="bg-[#002B3D] text-white p-3 rounded-full hover:bg-blue-900 transition"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}