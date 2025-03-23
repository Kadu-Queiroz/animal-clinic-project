import { Stethoscope, Syringe, Microscope, Package } from 'lucide-react';

interface ServicesSectionProps {
  openDetalhesServicoModal: (title: string, items: string[]) => void;
}

export function ServicesSection({ openDetalhesServicoModal }: ServicesSectionProps) {
  const services = [
    {
      title: 'Consultas e Especialidades',
      icon: <Stethoscope className="w-16 h-16 text-[#002B3D]" />,
      items: ['Oftamologia', 'Dermatologia', 'Ortopedia', 'Cardiologia', 'Nutrição', 'Gastroenterologia', 'Endocrinologia', 'Oncologia', 'Felinos', 'Silvestres e Exóticos'],
    },
    {
      title: 'Cirurgias',
      icon: <Syringe className="w-16 h-16 text-[#002B3D]" />,
      items: ['Cirurgias Gerais', 'Oftamologicas', 'Esplenectomia', 'Colecistectomia', 'Nodulectomia', 'Mastectomia'],
    },
    {
      title: 'Exames Clínicos',
      icon: <Microscope className="w-16 h-16 text-[#002B3D]" />,
      items: ['Ultrassom abdominal, ocular e cervical', 'Ecodoplercardiograma', 'Eletrocardiograma', 'Radiografias'],
    },
    {
      title: 'Demais Serviços',
      icon: <Package className="w-16 h-16 text-[#002B3D]" />,
      items: ['Vendas de Produtos e Acessórios', 'Farmácia'],
    },
  ];

  return (
    <section id="servicos" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#002B3D]">Nossos Serviços</h2>
        <div className="grid lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer border border-[#002B3D]/10"
              onClick={() => openDetalhesServicoModal(service.title, service.items)}
            >
              <div className="flex justify-center mb-8">{service.icon}</div>
              <h3 className="text-2xl font-bold text-center mb-6 text-[#002B3D]">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}