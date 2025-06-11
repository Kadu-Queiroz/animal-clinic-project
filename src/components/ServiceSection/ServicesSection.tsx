import { Stethoscope, Syringe, Microscope, Package } from 'lucide-react';
import { useModal } from '@/hooks/shared/useModal';

export function ServicesSection() {
  const { openModal } = useModal();

  const services = [
    {
      title: 'Consultas e Especialidades',
      icon: <Stethoscope className="h-16 w-16 text-[#002B3D]" />,
      items: [
        'Oftamologia',
        'Dermatologia',
        'Ortopedia',
        'Cardiologia',
        'Nutrição',
        'Gastroenterologia',
        'Endocrinologia',
        'Oncologia',
        'Felinos',
        'Silvestres e Exóticos',
      ],
    },
    {
      title: 'Cirurgias',
      icon: <Syringe className="h-16 w-16 text-[#002B3D]" />,
      items: [
        'Cirurgias Gerais',
        'Oftamologicas',
        'Esplenectomia',
        'Colecistectomia',
        'Nodulectomia',
        'Mastectomia',
      ],
    },
    {
      title: 'Exames Clínicos',
      icon: <Microscope className="h-16 w-16 text-[#002B3D]" />,
      items: [
        'Ultrassom abdominal, ocular e cervical',
        'Ecodoplercardiograma',
        'Eletrocardiograma',
        'Radiografias',
      ],
    },
    {
      title: 'Demais Serviços',
      icon: <Package className="h-16 w-16 text-[#002B3D]" />,
      items: ['Vendas de Produtos e Acessórios', 'Farmácia'],
    },
  ];

  const handleClick = (title: string, items: string[]) => {
    openModal('detalhesServico', { title, items });
  };

  return (
    <section id="servicos" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-4xl font-bold text-[#002B3D]">Nossos Serviços</h2>
        <div className="grid gap-8 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-xl border border-[#002B3D]/10 bg-gradient-to-br from-white to-gray-50 p-8 shadow-md transition hover:shadow-lg"
              onClick={() => handleClick(service.title, service.items)}
            >
              <div className="mb-8 flex justify-center">{service.icon}</div>
              <h3 className="mb-6 text-center text-2xl font-bold text-[#002B3D]">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
